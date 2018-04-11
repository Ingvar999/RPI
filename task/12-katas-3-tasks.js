'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */

function NextLetter(puzzle, visit, str, i0, j0){
    if (str.length == 0)
        return true;
    let i = i0+1, j=j0;
    if (puzzle[i] != undefined && puzzle[i][j] == str[0] && visit[i][j] == false){
        visit[i][j] = true;
        if (NextLetter(puzzle, visit.map(item => item.slice(0)), str.slice(1), i, j))
            return true;
    }
    i = i0-1;
    j=j0;
    if (puzzle[i] != undefined && puzzle[i][j] == str[0] && visit[i][j] == false){
        visit[i][j] = true;
        if (NextLetter(puzzle, visit.map(item => item.slice(0)), str.slice(1), i, j))
            return true;
    }
    i = i0; j=j0+1;
    if (puzzle[i][j] == str[0] && visit[i][j] == false){
        visit[i][j] = true;
        if (NextLetter(puzzle, visit.map(item => item.slice(0)), str.slice(1), i, j))
            return true;
    }
    i = i0+1; j=j0-1;
    if (puzzle[i][j] == str[0] && visit[i][j] == false){
        visit[i][j] = true;
        if (NextLetter(puzzle, visit.map(item => item.slice(0)), str.slice(1), i, j))
            return true;
    }
    return false;

}
function findStringInSnakingPuzzle(puzzle, searchStr) {
	throw new Error('Not implemented');
    puzzle = puzzle.map(item => item.split(''));
    let visit = puzzle.map(item => item.map(item => false));
    //console.log(puzzle);
    for (let i = 0; i<puzzle.length; i++){
        let j;
        do{
           j = puzzle[i].indexOf(searchStr[0]);
           if (j != -1){
               visit[i][j] = true;
               if (NextLetter(puzzle, visit.map(item => item.slice(0)), searchStr.slice(1), i, j))
                   return true;
               visit[i][j] = false;
           }
        } while (j != -1)
    }
    return false;
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    if (chars.length > 1) {
        let str ;
        for (let i = 0; i < chars.length; i++) {
            let arr = chars.split('');
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            str = arr.join('');
            let it = getPermutations(str.slice(1));
            let val = it.next();
            while (!val.done) {
                yield str[0] + val.value;
                val = it.next();
            }
        }
    }
    else
        yield chars;
}


/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let res = 0;
    console.log(quotes);
    while (quotes.length > 0) {
        let max = Math.max.apply(null, quotes);
        let maxind = quotes.indexOf(max);
        for (let i = 0; i<maxind; i++){
            res -= quotes[i];
        }
        res += max * maxind;
        quotes = quotes.slice(maxind+1);
    }
    return res;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        var res = '';
        for (let i = 0; i * 2 < url.length; i++) {
            res += String.fromCodePoint(url.codePointAt(2 * i) * 256 + (url.codePointAt(2 * i + 1) || 0))
        }
        return res;
    },

    decode: function (code) {
        var res = '';
        for (let i = 0; i < code.length; i++) {
            let c = code.codePointAt(i);
            res += String.fromCodePoint(c / 256 | 0) + (c % 256 ? String.fromCodePoint(c % 256) : '');
        }
        return res;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
