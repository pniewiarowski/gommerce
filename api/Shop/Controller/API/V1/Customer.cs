using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;

namespace Shop.Controller.API.V1;

public class Customer(Context context) : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet]
    [Route("/api/v1/customers")]
    public IActionResult Get()
    {
        return Json(Resource.Customer.FromCollection(context.Customers.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/customers/{id}")]
    public IActionResult GetByID(uint id)
    {
        return Json(Resource.Customer.From(context.Customers.Find(id)));
    }

    [HttpPost]
    [Route("/api/v1/customers")]
    public IActionResult Post([FromBody] Model.Customer customer)
    {
        context.Customers.Add(customer);
        context.SaveChanges();

        return GetByID(customer.ID);
    }

    [HttpPut]
    [Route("/api/v1/customers/{id}")]
    public IActionResult Put(uint id, [FromBody] Model.Customer updatedCustomer)
    {
        updatedCustomer.ID = id;

        context.Customers.Entry(updatedCustomer).State = EntityState.Modified;
        context.SaveChanges();

        return GetByID(id);
    }

    [HttpDelete]
    [Route("/api/v1/customers/{id}")]
    public IActionResult Delete(uint id)
    {
        var customer = context.Customers.Find(id);

        context.Attach(customer);
        context.Remove(customer);
        context.SaveChanges();

        return Get();
    }

    [HttpGet]
    [Route("/api/v1/customers/{id}/orders")]
    public IActionResult GetOrders(uint id)
    {
        var orders = context.Orders.Where(order => order.ID == id);

        return Json(Resource.Order.FromCollection(orders.ToList()));
    }

    [HttpGet]
    [Route("/api/v1/users/{id}/customers")]
    public IActionResult GetByUserID(uint id)
    {
        var customer = context.Customers.Where(customer => customer.UserID == id).First();

        return Json(Resource.Customer.From(customer));
    }
}