$(document).ready(function() {
  var availableMeals = [
      { mealName: "기본", price: 0 },
      { mealName: "맛있는 것", price: 15000 },
      { mealName: "더 맛있는 것", price: 30000 }
  ];
  
  var seatReservation = function(name) {
      this.name = name;
      this.availableMeals = availableMeals;
      this.meal = ko.observable(availableMeals[0]);
      this.remove = function() { viewModel.seats.remove(this) }
      this.formattedPrice = ko.dependentObservable(function() {
          var price = this.meal().price;
          return price ? price + '원' : "없음";        
      }, this);
  }
  
  var viewModel = {
      seats: ko.observableArray([
          new seatReservation("김채은"),
          new seatReservation("이왕석")
      ])
      ,addSeat: function() {
          this.seats.push(new seatReservation());   
      }
  };
  
  viewModel.totalSurcharge = ko.dependentObservable(function() {
     var total = 0;
     for (var i = 0; i < this.seats().length; i++)
         total += this.seats()[i].meal().price;
     return total;
  }, viewModel);
  
  ko.applyBindings(viewModel);
});