/*Scripts for the Quiz (Part B)
CPRG 256
Heshan Punchihewa
2022/04/20
*/

var xhr=new XMLHttpRequest();
var xmldoc;
var xmlRecord;
window.onload=loadXML;

function loadXML() {
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            xmldoc = xhr.responseXML;
            writeQuiz();
            document.getElementById("results").innerHTML = '';
            document.getElementById("results").style.display = 'none';
        }
    };
    xhr.open("GET", "FinalQuiz.xml", true);
    xhr.send();
    
    
    
}

function writeQuiz(){
    console.log('writeQuiz method');
    
    //var question;
    var output='';
     xmlRecord = xmldoc.getElementsByTagName("question");
    
    for(var i = 0; i <xmlRecord.length; i++ ){
        output += `<br> Question ${xmlRecord[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue}: 
        <br> ${xmlRecord[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue}
        <div class ="radio-buttons">
        <input type="radio" id="q${i+1}" name="q${i+1}" value="a"></input>A) ${xmlRecord[i].getElementsByTagName("a")[0].childNodes[0].nodeValue}
        <br> <input type="radio" id="q${i+1}" name="q${i+1}" value="b"></input>B) ${xmlRecord[i].getElementsByTagName("b")[0].childNodes[0].nodeValue}
        <br> <input type="radio" id="q${i+1}" name="q${i+1}" value="c"></input>C) ${xmlRecord[i].getElementsByTagName("c")[0].childNodes[0].nodeValue}
        <br> <input type="radio" id="q${i+1}" name="q${i+1}" value="d"></input>D) ${xmlRecord[i].getElementsByTagName("d")[0].childNodes[0].nodeValue}
        <br> </div>`;
        
    }
    output += `<br><div class="buttons"><button type="button" onclick="gradeQuiz();">Submit Quiz</button>
    <button type="reset" onclick="loadXML();">Restart Quiz</button>
    </div>`;
    
    document.getElementById("quiz").innerHTML = output;
    
}

function gradeQuiz(){
    let xmlKeys =  xmldoc.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;
    document.getElementById("results").innerHTML = '';

    const keyArr = xmlKeys.split(",");
    
    var correct = 0;
    var qvalueArr = [];
    var result = '';
    

    qvalueArr[0] = document.querySelector('input[name="q1"]:checked').value;
    qvalueArr[1] = document.querySelector('input[name="q2"]:checked').value;
    qvalueArr[2] = document.querySelector('input[name="q3"]:checked').value;
    qvalueArr[3] = document.querySelector('input[name="q4"]:checked').value;
    qvalueArr[4] = document.querySelector('input[name="q5"]:checked').value;
    
    for(var i=0; i < keyArr.length; i++ ){
       // console.log(`FOR LOOP iteration ${i}:  ${qvalueArr[i]} ${keyArr[i]} `)

        if(qvalueArr[i] !== null &&  qvalueArr[i] === keyArr[i]){
            correct++;
                      
        }
        
              
        
    }
    
    result = `You answered ${correct} out of ${keyArr.length} questions correctly. <br>Your score is: ${correct/keyArr.length * 100}%  <br><button type="reset" onclick="loadXML();">Try Again</button>`;
    document.getElementById("results").innerHTML = result;
    document.getElementById("results").style.display = 'block';
    window.scrollTo(0, 0);
    
}