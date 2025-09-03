const recipeSchema = {
    type : "object",
    properties : {
        id: {type : "string"},
        title: {type : "string"},
        description: {type : "string"},
        ingredients: {type: "array",
                    items: { type: "string" }},
        instructions: {type: "array",
                    items: { type: "string" }},
        cookingTime: { type: "number" }, // in minutes
        servings: { type: "number" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"] }, // easy, medium, hard
        rating: { type: "number",minimum: 0, maximum: 5 },
        createdAt: { type: "string", format: "date-time" }
        },
        required: [ "title", "ingredients", "instructions", "cookingTime", "servings", "difficulty"],
        additionalProperties: false
}


module.exports = recipeSchema;