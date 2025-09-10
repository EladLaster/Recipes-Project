const recipeSchema = {
    type : "object",
    properties : {
        id: {type : "string"},
        title: {type : "string",minLength:3,maxLength:100},
        description: {type : "string",minLength:10,maxLength:500},
        ingredients: {type: "array",
                    items: { type: "string" },
                    "minItems": 1},
        instructions: {type: "array",
                    items: { type: "string" },
                    "minItems": 1},
        cookingTime: { type: "number",
                    "minimum": 1},
        servings: { type: "number",
                    "minimum": 1},
        difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
        imageUrl: { type: "string", format: "uri" },
        isPublic: { type: "boolean", default: true },
        userId: { type: "string", format: "uuid" }, 
        createdAt: { type: "string", format: "date-time" }
        },
        required: [ "title", "description","ingredients", "instructions", "cookingTime", "servings", "difficulty"],
        additionalProperties: false
}


module.exports = recipeSchema;