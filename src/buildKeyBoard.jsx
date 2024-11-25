// BuildKeyBoard.js
import React from 'react';

const BuildKeyBoard = ({ handleKeyClick, inputText, isHebrew, isEmoji }) => {

  const englishLayout = [
    ['🌐', '☺️', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':_;', `"_'`, 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<_,', '>_.', '?_/', 'Shift'],
  ];

  // מקלדת בעברית
  const hebrewLayout = [
    ['🌐', '☺️', '/', ';', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', '{_[', '}_]', '|_\\'],
    ['Caps Lock', 'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', ':_;', `"_'`, 'Enter'],
    ['Shift', 'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', '<_,', '>_.', '?_/', 'Shift'],
  ];

  // מקלדת של אימוגים
  const faceEmojiLayout = [
    ['🌐', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '{_[', '}_]', '|_\\'],
    ['Caps Lock', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🤗', ':_;', `"_'`, 'Enter'],
    ['Shift', '👏', '🤝', '👎', '👍', '❤️', '💕', '🥳', '😎', '<_,', '>_.', '?_/', 'Shift'],
  ];


  const currentLayout = isHebrew ? hebrewLayout : (isEmoji ? faceEmojiLayout : englishLayout);
  return (
    <>
      {currentLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((keyvalue, keyIndex) => (
            <div
              key={keyIndex}
              className={`key ${keyvalue === 'Shift' ? 'shift-key' : (keyvalue === 'Caps Lock') ? 'caps-key' : ''}`}
              onClick={() => handleKeyClick(keyvalue)}
            >
              {keyvalue.includes('_') ? (
                keyvalue.split('_').map((part, index) => (
                  <span
                    key={index}
                    className={part === '☺️' ? 'bigger-emoji' : ''}
                  >
                    {part}
                  </span>
                ))
              ) : (
                <span className={keyvalue === '☺️' ? 'bigger-emoji' : ''} >
                  {keyvalue}

                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default BuildKeyBoard;