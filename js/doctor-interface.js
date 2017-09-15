import { Doctor } from './../js/doctor.js';
var apiKey = require('./../.env').apiKey;

$(document).ready(function(){

  $("#search").click(function(){

    $("#doctors table").empty();
    $("#results").html("");

    let issue = $("#issue").val();
    $("#issue").val("");
    let newSearch = new Doctor();
    newSearch.issuePromise(issue);
  });
  $("#advanceSearch").click(function(){

    $("#doctors table").empty("");
    $("#results").html("");
    
    let firstName = $("#firstname").val();
    let lastName = $("#lastname").val();
    $("#firstName").val("");
    $("#lastName").val("");
    let advSearch = new Doctor();
    advSearch.namePromise(firstName,lastName);
  });
});
