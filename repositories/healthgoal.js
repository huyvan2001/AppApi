import { HealthGoal,Info,PhysicalHealthyLevel,Recipe,HealthCare} from "../models/index.js";
import Exception from '../exceptions/Exception.js'
import { v4 as uuidv4 } from 'uuid';
const createHealthGoal = async({
    id_user,
    target_weight,
    id_physical_healthy_level,
    day_goal,
    create_at
}) => {

    if (!target_weight || !id_physical_healthy_level || !day_goal || !create_at) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }
    if (!Number.isInteger(day_goal) || !Number.isFinite(target_weight) ) {
        throw new Exception(Exception.WRONG_FORMAT)
    }
    let existedHealthgoal = await HealthGoal.find({id_user: id_user,is_finished: false})
    if (existedHealthgoal.length > 0) {
        throw new Exception(Exception.HEALTHGOAL_NOT_FINISHED)
    }
    let info = await Info.findOne({id_user: id_user})
    let weight = info.weight
    let goalWeight = Math.abs(weight - target_weight)
    console.log(goalWeight)
    let suggestWeight = day_goal/7
    console.log(suggestWeight)
    if (goalWeight > suggestWeight) {
      throw new Exception(Exception.NOT_CREATE_HEALTH_GOAL)
    }
    await HealthGoal.create({
        id_user,
        target_weight,
        id_physical_healthy_level,
        day_goal,
        create_at,
        is_finished: false
    })
}

const finishedGoal = async(id) => {
    await HealthGoal.findOneAndUpdate({_id:id},{is_finished: true})
}

const getHealthGoal = async(id_user) => {
    return await HealthGoal.aggregate([
        {
            $match: { id_user: id_user }
        },
        {
            $project:{
                _id:1,
                target_weight:1,
                day_goal:1,
                create_at:1,
                is_finished:1
            }
        }
    ])
}

const updateHealthGoal = async({
    id,
    id_user,
    target_weight,
    id_physical_healthy_level,
    day_goal
}) => {

    if (!target_weight || !id_physical_healthy_level || !day_goal) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

    let info = await Info.findOne({id_user: id_user})
    let weight = info.weight
    let goalWeight = weight - target_weight
    let suggestWeight = day_goal/7
    if (goalWeight > suggestWeight) {
      throw new Exception(Exception.NOT_CREATE_HEALTH_GOAL)
    }

    await HealthGoal.findOneAndUpdate({_id:id},{
        target_weight,
        id_physical_healthy_level,
        day_goal
    })
} 

const getHealthGoalDetail = async({
    id_user,
    id
}) => {
    const [info, healthGoal] = await Promise.all([
        Info.findOne({id_user: id_user}),
        HealthGoal.findOne({_id:id})
    ])
    const [healthyLevel, healthCare] = await Promise.all([
        PhysicalHealthyLevel.findOne({id_physical_healthy_level : healthGoal.id_physical_healthy_level}),
        HealthCare.findOne({id_health_care: info.id_health_care})
    ])
    let age = calculateAge(info.dateOfBirth)
    let height = info.height
    let weight = info.weight
    let gender = info.gender
    let goalWeight = weight - healthGoal.target_weight
    let day_goal = healthGoal.day_goal
    let PAL = healthyLevel.value
    let BMR = calculateBMR({
        gender,
        height,
        weight,
        age
    })
    let daily_water = weight * 2 * 0.5 * 0.03
    let TDEE = PAL * BMR
    if (goalWeight >= 0) {
        let caloriesDown = (7700 * goalWeight) / day_goal
        let daily_calories = TDEE - caloriesDown
        let breakfast_calories = daily_calories * 0.4
        let lunch_calories = daily_calories * 0.3
        let dinner_calories = daily_calories * 0.3

        let breakfast_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail: {$in : ["category_detail_breakfast",healthCare.key]},
                kcal: {
                    $lte: breakfast_calories,
                     $gt: breakfast_calories - 50
                  }}
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])

        let lunch_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail:  {$in : ["category_detail_lunch",healthCare.key]},
                kcal: {
                    $lte: lunch_calories,
                     $gt: lunch_calories - 50
                  }}
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])

        let dinner_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail:  {$in : ["category_detail_dinner",healthCare.key]},
                kcal: {
                    $lte: dinner_calories,
                     $gt: dinner_calories - 50
                  }
                }
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])


        return {
            meal_suggest: [
                {
                    _id: uuidv4(),
                    calories: breakfast_calories,
                    recipe: breakfast_recipe[0],
                    type: "breakfast"
                },
                {
                    _id: uuidv4(),
                    calories: lunch_calories,
                    recipe: lunch_recipe[0],
                    type: "lunch"
                },
                {
                    _id: uuidv4(),
                    calories: dinner_calories,
                    recipe: dinner_recipe[0],
                    type: "dinner"
                }
            ],
            current_weight: parseFloat(weight.toFixed(2)),
            target_weight: parseFloat(healthGoal.target_weight.toFixed(2)),
            day_goal: day_goal,
            daily_calories: parseFloat(daily_calories.toFixed(2)),
            daily_water: parseFloat(daily_water.toFixed(2)),
            type: "Lose weight"
        }
    }
    else {
        
        let caloriesUp = (7700 * Math.abs(goalWeight)) / day_goal
        let daily_calories = TDEE + caloriesUp
        let breakfast_calories = daily_calories * 0.4
        let lunch_calories = daily_calories * 0.3
        let dinner_calories = daily_calories * 0.3
        let breakfast_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail: {$in : ["category_detail_breakfast",healthCare.key]},
                kcal: {
                    $lte: breakfast_calories,
                     $gt: breakfast_calories - 50
                  }}
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])

        let lunch_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail:  {$in : ["category_detail_lunch",healthCare.key]},
                kcal: {
                    $lte: lunch_calories,
                     $gt: lunch_calories - 50
                  }}
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])

        let dinner_recipe = await Recipe.aggregate([
            {
                $match: {id_category_detail:  {$in : ["category_detail_dinner",healthCare.key]},
                kcal: {
                    $lte: dinner_calories,
                     $gt: dinner_calories - 50
                  }
                }
            },
            {
                $sample: {size : 100}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    id_recipe:1,
                    id_recipe_detail:1,
                    image_url:1
                }
            },
            {
                $limit : 1
            }
        ])

        return {
            meal_suggest: [
                {
                    _id: uuidv4(),
                    calories: breakfast_calories,
                    recipe: breakfast_recipe[0],
                    type: "breakfast"
                },
                {
                    _id: uuidv4(),
                    calories: lunch_calories,
                    recipe: lunch_recipe[0],
                    type: "lunch"
                },
                {
                    _id: uuidv4(),
                    calories: dinner_calories,
                    recipe: dinner_recipe[0],
                    type: "dinner"
                }
            ],
            current_weight: parseFloat(weight.toFixed(2)),
            target_weight: parseFloat(healthGoal.target_weight.toFixed(2)),
            day_goal: day_goal,
            daily_calories: parseFloat(daily_calories.toFixed(2)),
            daily_water: parseFloat(daily_water.toFixed(2)),
            type: "Gain weight"
        }
    }
    
}

function calculateBMR({
    gender,
    height,
    weight,
    age
}) {
    if (gender == 1) {
        return  66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    }
    
    else {
        return  665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
    } 
}


function calculateAge(birthDate) {
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday hasn't occurred yet this year
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
  
    if (!hasBirthdayPassed) {
      age--;
    }
    return age;
  }


export default {
    createHealthGoal,
    finishedGoal,
    getHealthGoal,
    getHealthGoalDetail,
    updateHealthGoal
}

