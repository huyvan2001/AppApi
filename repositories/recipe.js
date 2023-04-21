import { Recipe } from "../models/index.js";

const getRecipeByFilter = async({
    page,
    size,
    list_id_category_detail,
    time,
    serves,
    calories,
    author,
    searchString
}) => {

}

const getRecipeByIngredient = async({
    page,
    size,
    id_ingredient
}) =>
{
    let filterRecipesByIngredient = await Recipe.find({id_ingredient :id_ingredient})
}

const findRecipeById = async(id_recipe) => {
    return await Recipe.findOne({id_recipe : id_recipe})
    // if (typeof recipeUpdate !== "undefined" && recipeUpdate !== null){
    //     recipeUpdate.id_category_detail.push(id_category_detail)
    //     await recipeUpdate.save()
    // }
}

const updateCollection = async (
    {   ID_recipe, 
        ID_category_detail}) => {
    try {
      // Cập nhật trường id_recipe_detail của đối tượng Recipe dựa trên ID
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { id_recipe: ID_recipe }, // Điều kiện tìm kiếm đối tượng Recipe cần cập nhật
        { $push: { id_category_detail: ID_category_detail } }, // Cập nhật trường id_recipe_detail bằng cách thêm mới giá trị vào mảng
        { new: true } // Lựa chọn trả về đối tượng Recipe đã được cập nhật
      );
      console.log(updatedRecipe)

    } catch (error) {
      console.error(error);
    }
  };

const updateAllRecipe = async(listUpdateRecipe) => {
    for (let idupdate of listUpdateRecipe){
        await updateCollection({
            ID_recipe: idupdate.id_recipe,
            ID_category_detail: idupdate.id_category_detail
        })  
    }

}

export default {
    updateAllRecipe
}