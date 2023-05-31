let original_index =  localStorage.getItem('index'); // создаем изначельный индекс
original_index++;
let savedCode = localStorage.getItem('adderPlanCode') || '';//при загрузке страницы выдаем планы
let savedTexts = JSON.parse(localStorage.getItem('adderPlanTexts')) || {};// и текст к этим планам

function adderPlan() {// создание планов с текстом
    localStorage.setItem('index', original_index++);
    let div_TextArea = document.getElementById('for_text').value;//берем значение текстового поля
    //сохраняем нужный участок кода в перевенную
    // эта строчка нужна// <div class="text_plan_dls" id="div_text_content_plan_DLS${original_index}" value="${original_index}" contenteditable="true">${div_TextArea}</div>
    let codeString = `
    <div class="conten_plan" id="plan_${original_index}">
      <div class="text_plan" id="div_text_content_plan_${original_index}" value="${original_index}" contenteditable="true">${div_TextArea}</div>
      <div class="button_collection">
        <div class="button_plan" id="save" onclick="saveText('div_text_content_plan_${original_index}')">сохранить</div>
        <div class="button_plan" id="open" onclick="tumbler('div_text_content_plan_DLS${original_index}')">открыть</div>
        <div class="button_plan" id="dell" onclick="removePlan(event, 'plan_${original_index}', 'div_text_content_plan_${original_index}')">удалить</div>
      </div>
    </div>`;
    //вставляем код в спецальную зону для контейнеров
    document.getElementById('div_content_two').insertAdjacentHTML("beforeend", codeString);
    savedCode += codeString; // спецальная переменная для сохранения кода в localStorage
    savedTexts[`div_text_content_plan_${original_index}`] = div_TextArea;//сохраняем текст в переменной

    let textElement = document.getElementById(`div_text_content_plan_${original_index}`);
    textElement.addEventListener('input', function() {
      saveText(`div_text_content_plan_${original_index}`, textElement.textContent);
    });

    localStorage.setItem('adderPlanCode', savedCode);//сохраняем в localStorage код
    localStorage.setItem('adderPlanTexts', JSON.stringify(savedTexts));//сохраняем в localStorage текст
   //сохраняем в localStorage индекс
  }
  
function removePlan(event, planId, textId) {//удаление планов и текста
    let planElement = document.getElementById(planId);//получаем айди элемента
    planElement.remove();//удаляем элемент из html
  
    delete savedTexts[textId];//удаляем текст в html
  
    let updatedCode = savedCode.replace(planElement.outerHTML, '');//обновляем код
    savedCode = updatedCode;//сохраняем изменение кода

    localStorage.setItem('adderPlanCode', updatedCode);//вносим изменения в localStorage с кодом
    localStorage.setItem('adderPlanTexts', JSON.stringify(savedTexts));//вносим изменения с localStorage с текстом
}
// Восстановление сохраненного кода и текстовых содержимых после перезагрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  if (savedCode) {//проверка есть ли блоки в localStorage
    //выдаем блоки если они есть
    document.getElementById('div_content_two').insertAdjacentHTML("beforeend", savedCode);
  }
  //проверка на сохраненый текст контейнера
  if (savedTexts) {
    Object.keys(savedTexts).forEach(function(key) {
      let textElement = document.getElementById(key);
      if (textElement) {
        textElement.textContent = savedTexts[key];
      }
    });
  }
});
function clear_plan(){//полная очистка всего содержимого
  document.getElementById('div_content_two').innerHTML = ''; // Очистка содержимого div_content_two
  savedCode = ''; // Сброс сохраненного кода
  savedTexts = {}; // Сброс сохраненных текстовых данных

  localStorage.removeItem('adderPlanCode'); // Удаление ключа 'adderPlanCode' из localStorage
  localStorage.removeItem('adderPlanTexts'); // Удаление ключа 'adderPlanTexts' из localStorage
  localStorage.removeItem('index');
  original_index = 0; 
  localStorage.clear();//чистим локалку
}
function saveText(textId) {//сохраняем текст если он был изменен 
  let textElement = document.getElementById(textId);//получаем текст по айди
  let newText = textElement.textContent;//переносим значение в новую переменную
  savedTexts[textId] = newText;//сохраняем новый текс 
  localStorage.setItem('adderPlanTexts', JSON.stringify(savedTexts));// заносим все в localStorage
}
// не рабочий сигмент кода, по непонятным мне причинам в будущем исправить
// function tumbler(idOpen){
//   let tumble = document.getElementById(idOpen).getElementsByClassName(`classopen`)
//   if (tumble.style.display =='flex') {
//     tumble.style.display ='none'
//     alert('worked if')
//   }else{
//     alert('worked else')
//     tumble.style.display = 'none'
//   }
//   alert('workedlast')
// }