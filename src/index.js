// src/index.js

const monaco = require(`monaco-editor`);

const editor = monaco.editor.create(
  document.querySelector('.editor-container'), {
    value: '(1/)\n',
    language: 'javascript',
    wordWrap: 'on',
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  }
);

editor.getModel().updateOptions({
  tabSize: 2
});

window.editor = editor;

// window.addEventListener('resize', function () {
//   editor.layout();
// });

const say = (text) => {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ru-RU';
  synth.speak(utter);
};

const $run = document.querySelector('.js--run');
$run.addEventListener('click', (e) => {
  e.preventDefault();

  const acorn = require('acorn');
  const code = editor.getValue();

  try {
    acorn.parse(code);
    eval(code);
  } catch(__err) {
    console.log(__err.toString());

    const loc = __err.loc;

    if (__err.constructor.name === 'SyntaxError') {
      say(`Синтаксическая ошибка в строке ${loc.line}. Посмотрите, что там не так и пожалуйста исправьте.`);
    }

    editor.setPosition({
      column: loc.column + 1,
      lineNumber: loc.line
    });

    editor.focus();
  }
});
