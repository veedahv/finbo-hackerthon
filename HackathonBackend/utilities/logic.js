var axios = require('axios');
// const { response } = require('express');

class logic{



    test(kwargs){

        // return ''
        
    }

    credit(kwargs){
        var config = {
            method: 'get',
            url: 'http://topped-canals.000webhostapp.com/api/credit',
            headers: { 
              'Cookie': 'PHPSESSID=1vkjujkn3ftskkmv4t5h1nlc3u'
            }
          };
          
          return axios(config)
          .then(function (response) {
            return JSON.stringify(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    debit(kwargs){
        

        var config = {
        method: 'get',
        url: 'http://topped-canals.000webhostapp.com/api/debit',
        headers: { 
            'Cookie': 'PHPSESSID=1vkjujkn3ftskkmv4t5h1nlc3u'
        }
        };

        return axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    }

    transaction(kwargs){

        console.log("transaction called")

        var config = {
        method: 'get',
        url: 'http://topped-canals.000webhostapp.com/api/transaction/2',
        headers: { 
            'Cookie': 'PHPSESSID=1vkjujkn3ftskkmv4t5h1nlc3u'
        }
        };

        return axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    }

    statement(kwargs){

        console.log("statement called")

        var config = {
        method: 'get',
        url: 'http://topped-canals.000webhostapp.com/api/statement',
        headers: { 
            'Cookie': 'PHPSESSID=1vkjujkn3ftskkmv4t5h1nlc3u'
        }
        };

        return axios(config)
        .then(function (response) {
        return JSON.stringify(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    }

    account(kwargs){

        console.log("account called")

        var config = {
        method: 'get',
        url: 'http://topped-canals.000webhostapp.com/api/account',
        headers: { 
            'Cookie': 'PHPSESSID=1vkjujkn3ftskkmv4t5h1nlc3u'
        }
        };

        return axios(config)
        .then(function (response) {
        
            return JSON.stringify(response.data)
            
        })
        .catch(function (error) {
        console.log(error);
        });
        
        

    }
}




module.exports =  {
    logic
    }