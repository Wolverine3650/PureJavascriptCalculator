//to wait for DOM content to be loaded 
window.addEventListener('DOMContentLoaded',init);
//arry to hold all keys
const opts = ['*','/','+','-','9','8','7','6','5','4','3','2','1','0','.'];
// array to hold special function keys
const specs = ['*','/','+','-'];


//Main function that will be executed first when a page is loaded.
function init(){

    //updating title
    document.title="Pure JAVAScript Calculator title changed";
   
    //creating a favicon
    const doc =  document.createElement('link');
    doc.setAttribute('rel','shortcut icon');
    doc.setAttribute('href','fav.png');
    doc.setAttribute('type','image/x-icon');
    document.head.appendChild(doc);
    //
    console.log('ready');
    //switches to turn on and off
    let dec = false; // for checking if user is entering decimal point again in single number
    let eva = false; // to check everything is evaluated properly

    //visual part of my calculator
    const container = document.createElement('div');
    container.classList.add('container');
    container.style.maxWidth='600px';
    container.style.margin = 'auto';
    document.body.appendChild(container);
    const output = document.createElement('input');
    output.setAttribute('type','text');
    output.classList.add('output');
    output.style.width = '100%';
    output.style.lineHeight = '50px';
    output.style.fontSize = '3em';
    output.style.textAlign = 'right';
    container.appendChild(output);
    const main = document.createElement('div');
    main.classList.add('main');
    main.style.width='100%';
    container.appendChild(main);

    //looping through the keys array to create buttons for every element
    opts.forEach(function(val){
        //console.log(val);
        btnMaker(val,addOutput);
    })
    //special functions
    btnMaker('=',evalOutput); // equals button
    btnMaker('C',clrOutput); // clear screen button


    //function to update the color of border if there is something is wrong
    function cOutput(v){
        output.style.border = v  + '1px solid';
        output.style.color = v;
    }


    //function to evaluate the expression
    function evalOutput(){
        //output.style.border = 'black 1px solid';
        console.log('=');
        if(output.value===""){
            cOutput('red');
            //output.style.border = 'red 1px solid';
        }
        else if(eva){
            cOutput('red');
        }
        else{
            if(output.value==='Infinity' || output.value==='-Infinity'){
                output.value="";
            }
            else{
            output.value = eval(output.value);
        }
        }
        dec = output.value.includes('.');

    }
    
    //function for the clear button
    function clrOutput(){
        cOutput('black');
        output.value = "";
    }

    //button creating function
    function btnMaker(txt, myFunction){
        let btn = document.createElement('button');
        btn.setAttribute('type','button');
        btn.style.width = '23%';
        btn.style.backgroundColor='#4CAF50';
        btn.style.color='white';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '2em';
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click',myFunction);
        main.appendChild(btn);

    }

    function addOutput(e){
        console.log(dec);
        cOutput('black');
    //console.log(e.target.val);
        let char = e.target.val;
        //to track if input already has a decimal places
        if(char == '.'){
            if(dec){
                char = '';
                cOutput('red');
            }
            else{
                dec = true;
            }
        }
        //if special key is a last character user cannot use equals functionality
        eva = specs.includes(char);
        if(eva){
            dec = false;
        }
        output.value+=char;


    }
}