"use strict";

const SORTFUNCS = {
    name: (p1, p2) => {
        const name1 = p1.name.first + p1.name.last;
        const name2 = p2.name.first + p2.name.last;

        if(name1 > name2){
            return 1;
        } 
        else if(name1 < name2){
            return -1;
        }
        return 0;
    },
    ages: (p1, p2) => {
        const age1 = p1.dob.age;
        const age2 = p2.dob.age;

        if(age1 > age2){
            return 1;
        } 
        else if(age1 < age2){
            return -1;
        }
        return 0;
    },
    random: (_) => {
        return Math.random() - 0.5;
    }
}