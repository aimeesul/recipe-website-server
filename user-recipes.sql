-- SQLite
select 
    r.id, u.firstName, u.lastName, r.title, i.ingredientName, ri.quantity, mu.unitName
from 
    Users u 
    join Recipes r on r.userId=u.id 
    join RecipeIngredients ri on ri.recipeId=r.id 
    join Ingredients i on i.id=ri.ingredientId 
    left outer join MeasurementUnits mu on mu.id=ri.measurementUnitId 
