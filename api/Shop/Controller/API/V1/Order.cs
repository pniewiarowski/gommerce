using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;

namespace Shop.Controller.API.V1;

public class Order(Context context) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/orders")]
    public IActionResult Get()
    {
        return Json(Resource.Order.FromCollection(context.Orders.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/orders/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Order.From(context.Orders.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/orders")]
    public IActionResult Post([FromBody] Model.Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();

        return GetByID(order.ID);
    }

    [HttpPut]
    [Route("/api/v1/orders/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Order updatedOrder)
    {
        updatedOrder.ID = id;

        context.Orders.Entry(updatedOrder).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/orders/{id}")]
    public IActionResult Delete(uint id)
    {
        var order = context.Orders.Find(id);

        context.Attach(order);
        context.Remove(order);
        context.SaveChanges();

        return Get();
    }
}