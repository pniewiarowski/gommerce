using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Resource;

namespace Shop.Controller.API.V1;

public class Category(Context context) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/categories")]
    public IActionResult Get()
    {
        var categories = context.Categories.OrderBy(c => c.SortOrder);

        return Json(Resource.Category.FromCollection(categories.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/categories/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Category.From(context.Categories.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/categories")]
    public IActionResult Post([FromBody] Model.Category category)
    {
        context.Categories.Add(category);
        context.SaveChanges();

        return GetByID(category.ID);
    }

    [HttpPut]
    [Route("/api/v1/categories/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Category updatedCategory)
    {
        updatedCategory.ID = id;

        context.Categories.Entry(updatedCategory).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/categories/{id}")]
    public IActionResult Delete(uint id)
    {
        var category = context.Categories.Find(id);

        context.Categories.Attach(category);
        context.Categories.Remove(category);
        context.SaveChanges();

        return Get();
    }

    [HttpGet]
    [Route("/api/v1/categories/resource-info")]
    public IActionResult GetResourceInfo()
    {
        var info = new ResourceInfo();

        info.Name = "categories";
        info.Size = context.Categories.ToList().Count;

        return Json(info);
    }

    [HttpGet]
    [Route("/api/v1/categories/{id}/products")]
    public IActionResult GetProducts(uint id)
    {
        var products = context.Products
            .Where(p => p.CategoryID == id)
            .OrderBy(p => p.SortOrder);

        return Json(Resource.Product.FromCollection(products.ToList()));
    }
}