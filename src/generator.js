function* helloGeneratorFunction() {
    yield 2019;
    return 'REACT SAGA'; //Kết thúc generatorFunction 
                        // còn 1 cách kết thúc là throw
}


const result = helloGeneratorFunction();
console.log('====================================');
console.log("1: ",result.next());
console.log("2: ", result.next());
console.log('====================================');