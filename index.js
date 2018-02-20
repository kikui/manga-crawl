#!/usr/bin/env node 
const program = require('commander') 
const request = require('request');
// Conﬁguration des paramètres attendus 
program  
    .version('1.0.0')  
    .option('-s, --settings', 'configure your acount')
    .option('-al, --animelist [username]', 'Read an anime list')
    .option('-a, --anime [animename]', 'Read an anime\'s details')  
    .option('-h, --history [username]', 'Read a user\'s history') 
    .option('-as, --animeserch [animename]', 'Search anime')
    .option('-at, --animetop', 'Read the top anime')
    .option('-ap, --animepopular', 'Read the popular anime')
    .option('-au, --animeupcoming', 'Read the upcoming anime')
    .option('-ml, --mangalist [username]', 'Read a manga list')
    .option('-m, --manga [manganame]', 'Read an manga\'s details')
    .option('-ms, --mangaserch [manganame]', 'Search manga')
    .option('-aa, --addanime [animename]', 'Add anime to anime list')
    .option('-ua, --updateanime [animename]', 'Update an anime on user\'s anime list')
    .option('-da, --deleteanime [animename]', 'Delete an anime from user\'s anime list')
    .option('-am, --addmanga [manganame]', 'Add manga to manga list')
    .option('-um, --updatemanga [manganame]', 'Update a manga on user\'s manga list')
    .option('-dm, --deletemanga [manganame]', 'Delete a manga from user\'s manga list')

// On parse (convertit en format utilisable) les options 
// fonction synchrone 
program.parse(process.argv) 
// Maintenant on peut les utiliser 
if (program.settings) 
{  
    
}else if (program.animelist) 
{  
    let username = program.animelist;
    console.log(username);
    let url = `http://mal-api.com/animelist/${username}`;

    request(url, function (err, response, body) {
        if(err){
            console.log(err);
        } else {
            let animes = JSON.parse(body);
            console.log(animes);
            
            console.log("voici la liste des animes de "+username);
            animes.forEach(function(anime){
                //console.log(anime);
                animeName = anime.title;
                //console.log("city liste feature :"+cityFeature);
            });
        }
    });
} else if (program.anime) 
{  
    
} else if (program.history) 
{  
    
}else if (program.animeserch) 
{  
    
}else if (program.animetop) 
{  
    
}else if (program.animepopular) 
{  
    
}else if (program.animeupcoming) 
{  
    
}else if (program.mangalist) 
{  
    
}else if (program.manga) 
{  
    
}else if (program.mangaserch) 
{  
    
}else if (program.addanime) 
{  
    
}else if (program.updateanime) 
{  
    
}else if (program.deleteanime) 
{  
    
}else if (program.addmanga) 
{  
    
}else if (program.updatemanga) 
{  
    
}else if (program.deletemanga) 
{  
    
}else 
{  
    program.help() 
}

//fonction d authentification