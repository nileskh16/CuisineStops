'use-strict';

angular.module('skapp', ['ui.router'])
  .config(RouteConfig)
  .service('list', list)
  .controller('homeCon', homeCon)
  .controller('catCon', catCon)
  .controller('itemCon', itemCon)

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider){
  //$urlRouterProvider.otherwise('/index');
  $stateProvider
  .state('categories', {
    url: '/categories',
    templateUrl: 'categories.html',
    controller: 'catCon as con',
    resolve:{
      items: ['list', function(list){
        return list.getItems();
      }]
    }
  })
  .state('index', {
    url: '/index',
    templateUrl: 'index.html',
  })
  .state('categories.item',{
    url: '/item/{id}',
    templateUrl: 'item.html',
    controller: 'itemCon as con'
  });
};

list.$inject = ['$q', '$timeout'];
function list($q, $timeout){
  var service = this;
  var items = [];
  items.push({name:'American', en: ['Hotdogs', 'Pancakes', 'Burgers', 'Donut', 'Choc chip pecan pie', 'American burnt onion dip', 'Cornbread', 'John Torode\'s big burger', 'Pumpkin Pie', 'Cobb salad with buttermilk ranch dressing']});
  items.push({name:'Italian', en: ['Pizza', 'Pasta', 'Affogato al caffè', 'Fig & prosciutto pizzettas', 'Aubergine rolls with spinach & ricotta', 'Gnocchi with parsley, butter & samphire']});
  items.push({name:'Indian', en: ['Rotee', 'Panipuri', 'Rabadi', 'Sambar', 'Puran Poli', 'Kerelan Vege Wrap']});
  items.push({name:'Mexican', en: ['Chilli chocolate cookies', 'Mexican veggie wraps', 'Homemade tortilla chips', 'Mexican chicken stew', 'Mexican potatoes', 'Chilli con carne']});
  items.push({name: 'Caribbean', en: ['Rum punch', 'Sticky jerk salmon with mango slaw', 'Caribbean patties', 'Tropical breakfast smoothie', 'Reggae reggae nachos']})
  items.push({name:'Chinese', en: ['Rice', 'Noodles', 'Chopsie']});

  service.getItems = function(){
    var prom = $q.defer();
    $timeout(function () {
      prom.resolve(items);
    }, 2000);
    return prom.promise;
  }
};

homeCon.$inject = ['$scope'];
function homeCon($scope){
  var con = this;
};

catCon.$inject = ['$scope', 'items'];
function catCon($scope, items){
  var con = this;
  con.items = items;
  con.cat = {
    display: 'block',
    width: '40%',
    marginLeft: '10%',
    float: 'left',
    poistion: 'relative',
    top: '20px',
    backgorundColor: '#ddd'
  }
};

itemCon.$inject = ['$scope', 'items', '$stateParams'];
function itemCon($scope, items, $stateParams){
  var con = this;
  con.item = items[$stateParams.id];
};
