import React, { useState, useEffect } from 'react';
import './App.css';
import BuildKeyBoard from './buildKeyBoard';

export default function Keyboard() {
	//שינוי הסטטוס של המשתנים 
	const [inputText, setInputText] = useState('');
	const [isCaps, setIsCaps] = useState(false);
	const [isShift, setIsShift] = useState(false);
	const [isGreen, setisGreen] = useState(false);
	const [isBrown, setisBrown] = useState(false);
	const [isHebrew, setIsHebrew] = useState(false);
	const [isEmoji, setIsEmoji] = useState(false);
	const [isUndo, setUndo] = useState(false);
	const [history, setHistory] = useState([]);
	const [fontSize, setFontBig] = useState(false);
	const [fontSize1, setFontSmall] = useState(false);
	const [nowSize, SetNowSize] = useState(12);
	const [isall, setAll] = useState(false);

	//ניתוב לכל האופציות 
	const handleKeyClick = (key) => {

		if (key === 'Undo') {
			handleUndoKey();
			return;
		}
		if (key === 'All') {
			handleAallKey();
			return;
		}
		if (key === '⬆️') {
			handleFontBig();
			return;
		}
		if (key === '⬇️') {
			handleFontSmall();
			return;
		}
		if (key === 'green') {
			handleGreenKey();
			return;
		}
		if (key === 'brown') {
			handlebrownKey();
			return;
		}
		if (key === 'Enter') {
			handleEnterKey();
		}
		else if (key === '<' || key === '>') {
		}
		else if (key === ' ') {
			handleSpaceKey();
		}
		else if (key === 'Caps Lock') {
			handleCapsLock();
		}
		else if (key === 'X') {
			handleDeleteKey();
		}
		else if (key === 'Shift') {
			handleShiftKey();
		} else if (key === '🌐') {
			handleLanguageSwitch();
			return;
		} else if (key === '☺️') {
			handleEmojiKey(key);
			return;
		} else {
			handleRegularKey(key);
		}
		//שמירת היסטורית ההקלדה
		setHistory([...history, inputText]);
	};

	// בשעת הלחיצה all שינוי הצבע של הכפתור
	const handleAallKey = () => {
		setAll(!isall);
		if (!isall) {
			const Allkey = document.querySelector('.All-key');
			Allkey.style.backgroundColor = '#CB5BCC';
		}
		else {
			const Allkey = document.querySelector('.All-key');
			Allkey.style.backgroundColor = '#445760';
		}
	};

	//ctrl z  
	const handleUndoKey = () => {
		setUndo(!isUndo);
		if (history.length > 0) {
			setInputText(history[history.length - 1]);
			setHistory(history.slice(0, -1));
		}
	}

	//הגדלת של הטקסט
	const handleFontBig = () => {
		setFontBig(!fontSize);
		if (fontSize1 === true)
			setFontSmall(false);
		if (isall) {
			let updatedText = inputText.replace(/font-size:\d+px/g, `font-size:${nowSize + 2}px`);
			setInputText(updatedText);
		}
		if (!fontSize && nowSize < 30) {
			SetNowSize(nowSize + 2);
		}
	};

	//הקטנת הטקסט
	const handleFontSmall = () => {
		setFontSmall(!fontSize1);
		if (fontSize === true)
			setFontBig(false);
		if (isall) {
			let updatedText = inputText.replace(/font-size:\d+px/g, `font-size:${nowSize - 2}px`);
			setInputText(updatedText);
		}
		if (!fontSize1 && nowSize > 14) {
			SetNowSize(nowSize - 2);
		}
	};

	//עידכון שפת המקלדת
	const handleLanguageSwitch = () => {
		setIsHebrew(!isHebrew);
	};

	//עידכון מקלדת אימוגי
	const handleEmojiKey = () => {
		setIsEmoji(!isEmoji);
		setIsHebrew(false);
	};

	//שינוי לצבע ירוק
	const handleGreenKey = () => {
		setisGreen(!isGreen);
		//אם כל הטקסט מסומן
		if (isall) {
			const regexBlack = new RegExp('color:black', 'g');
			const regexBrown = new RegExp('color:#96541F', 'g');
			let updatedText = inputText.replace(regexBlack, 'color:#22F279');
			updatedText = updatedText.replace(regexBrown, 'color:#22F279');
			setInputText(updatedText);
		}
		//כיבוי האור של המקש החום-במידה והוא דולק
		if (isBrown === true) {
			setisBrown(false);
			const brownKey = document.querySelector('.brown-key');
			brownKey.style.backgroundColor = '#445760';
		}
		//הדלקת האור של הכפתור הירוק
		const greenKey = document.querySelector('.green-key');
		greenKey.style.backgroundColor = !isGreen ? '#22F279' : '#445760';

		//החזרה לצבע שחור הבסיסי
		if (isGreen && isall) {
			const regexBlack = new RegExp('color:#22F279', 'g');
			const regexGreen = new RegExp('color:#96541F', 'g');

			let updatedText = inputText.replace(regexBlack, 'color:black');
			updatedText = updatedText.replace(regexGreen, 'color:black');

			setInputText(updatedText);
		}

	};

	// שינוי לצבע החום
	const handlebrownKey = () => {
		setisBrown(!isBrown);
		//אם כל הטקסט מסומן
		if (isall) {
			const regexBlack = new RegExp('color:black', 'g');
			const regexGreen = new RegExp('color:#22F279', 'g');
			let updatedText = inputText.replace(regexBlack, 'color:#96541F');
			updatedText = updatedText.replace(regexGreen, 'color:#96541F');
			setInputText(updatedText);
		}
		//כיבוי האור של הכפתור הירוק -במידה והוא דלוק
		if (isGreen === true) {
			setisGreen(false);
			const redKey = document.querySelector('.green-key');
			redKey.style.backgroundColor = '#445760';
		}
		//הדלקת האור של הצבע החום
		const brownKey = document.querySelector('.brown-key');
		brownKey.style.backgroundColor = !isBrown ? '#96541F' : '#445760';
		//החזרת הצבע לשחור הבסיסי
		if (isBrown && isall) {
			const regexBlack = new RegExp('color:#22F279', 'g');
			const regexGreen = new RegExp('color:#96541F', 'g');

			let updatedText = inputText.replace(regexBlack, 'color:black');
			updatedText = updatedText.replace(regexGreen, 'color:black');
			setInputText(updatedText);
		}
	};

	//פונקצית ירידת שורה
	const handleEnterKey = () => {
		const newContent = inputText + '\n';
		setInputText(newContent);
	};

	//פונקצית מקש רווח
	const handleSpaceKey = () => {
		const newContent = inputText + ' ';
		setInputText(newContent);
	};

	//פונקצית קאפסלוק
	const handleCapsLock = () => {
		const updatedCaps = !isCaps;
		setIsCaps(updatedCaps);
		//במידה וכל הטקסט מסומן
		if (isall) {
			const tempElement = document.createElement('div');
			tempElement.innerHTML = inputText;

			const spanElements = tempElement.getElementsByTagName('span');

			for (const span of spanElements) {
				const originalText = span.textContent;
				const uppercasedText = originalText.toUpperCase();
				span.textContent = uppercasedText;
			}
			setInputText(tempElement.innerHTML)
		}

		const keys = document.querySelectorAll('.key');
		keys.forEach((key) => {
			const firstSpanElement = key.querySelector('span:first-child');
			if (firstSpanElement) {
				const keyText = firstSpanElement.innerText.toLowerCase();
				//שינוי כל האותיות במקלדת לאותיות רשיות או קטנות
				if (!['shift', 'enter', 'caps lock', 'undo', 'green', 'brown', 'all'].includes(keyText)) {
					firstSpanElement.innerText =
						((updatedCaps && isShift) || (!updatedCaps && !isShift))
							? keyText.toLowerCase() : keyText.toUpperCase();
				}
			}
		});
		//שינוי הצבע של הכפתור בעת ההקשה
		const capsOn = document.querySelector('.caps-key');
		capsOn.style.backgroundColor = !isCaps ? '#F07609' : '#445760';
		//אם הכפתור כבוי וכל הטקסט מסומן -שינוי לאותיות קטנות
		if (capsOn.style.backgroundColor === "rgb(68, 87, 96)" && isall) {
			const tempElement = document.createElement('div');
			tempElement.innerHTML = inputText;

			const spanElements = tempElement.getElementsByTagName('span');
			for (const span of spanElements) {
				const originalText = span.textContent;
				const uppercasedText = originalText.toLowerCase();
				span.textContent = uppercasedText;
			}
			setInputText(tempElement.innerHTML)
		}
	};

	//פעולת מחיקה לתו
	const handleDeleteKey = () => {
		//במידה וכל הטקסט מסומן
		if (isall) {
			// Set the input text to an empty string
			setInputText('');
		}
		else {
			let newcontent = inputText.length;
			let space = inputText.slice(-10, -9)
			//בדיקה אם אין טקסט ואין מה למחוק
			if (newcontent != 0) {
				//בדיקה האם מוחקים אימוגי
				if (space === '>') {
					newcontent = inputText.slice(0, inputText.length - 50);
					setInputText(newcontent);

				}
				//או אות רגילה
				else {
					newcontent = inputText.slice(0, inputText.length - 49);
					setInputText(newcontent);
				}
			}
		}
	};

	//פונקציה זו רק מעדכנת את הערך של שיפט אם נלחץ או לא
	const handleShiftKey = () => {
		const updatedShift = !isShift;
		setIsShift(updatedShift);
		// שווה לשיפט קי class במשתנה נקבל את כל הערכים שיש להם  
		const shiftKeyElements = document.querySelectorAll('.shift-key');
		console.log(shiftKeyElements);
		//עובר על כל הערכים ומשנה להם את הצבע
		shiftKeyElements.forEach((shiftKeyElement) => {
			shiftKeyElement.style.backgroundColor = updatedShift ? '#1747F0' : '#445760';
		});
	}

	//פונקציה שמקבלת את התו
	const handleRegularKey = (key) => {
		//חלוקת התו בעת הצורך
		const keys = key.split(/[._]/);
		let newContent;
		//בדיקות לכמה חלקים חולק התו
		if (keys.length > 1) {
			//אם השיפט דלוק
			if (isShift) {
				if (keys.length === 3) {
					if (keys[0] === '>') {
						newContent = inputText + '>';
						key = keys[0];
					}
					else {
						newContent = inputText + '_';
						key = keys[1];
					}
				}
				//אם לאחר השיפט הוקש תו בודד
				else {
					newContent = inputText + keys[0];
					key = keys[0];
				}
			}
			else {
				if (keys.length === 3) {
					if (keys[0] === '>') {
						newContent = inputText + '.';
						key = '.';
					}
					else {
						newContent = inputText + '-';
						key = keys[0];
					}
				}
				else {
					newContent = inputText + keys[1];
					key = keys[1];
				}
			}
		}
		//אם הוא לא חולק לחלקים
		else {
			key = (isCaps) ? key.toUpperCase() : key.toLowerCase();
			newContent = inputText + key;
			setInputText(newContent);
		}
		if (isGreen) {
			const add = inputText + `<span style="color:#22F279;font-size:${nowSize}px">${key}</span>`
			setInputText(add);

		}
		else if (isBrown) {
			const add = inputText + `<span style="color:#96541F;font-size:${nowSize}px">${key}</span>`
			setInputText(add);
		}
		else {
			const add = inputText + `<span style="color:black;font-size:${nowSize}px">${key}</span>`;
			setInputText(add);
		}
	};

	return (
		<div className='keyboard'>
			<div className="textcontainer">
				<pre dangerouslySetInnerHTML={{ __html: inputText }}></pre>
			</div>
			<div className="keyboardcontainer">
				<div className="container">
					<div className="row">
						{['~.`', '!.1', '@.2', '#.3', '$.4', '%.5',
							'^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=',
							'X']
							.map((keyvalue) =>
							(
								<div key={keyvalue} className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									{keyvalue.includes('.') ? (
										//מיון למערך של הערך לפני ואחרי הנקודה והצגתו
										keyvalue.split('.').map((part, index) => (
											<span key={index}>{part}</span>
										))
									) :
										//X אם נלחץ מקש מחיקה זה נשלח עם הערך 
										(
											keyvalue === 'X' ? (
												<span onClick={() => handleKeyClick(keyvalue)}>{keyvalue}</span>
											) : (
												<span>{keyvalue}</span>
											)
										)}
								</div>
							))}
					</div>

					<BuildKeyBoard
						handleKeyClick={handleKeyClick}
						inputText={inputText}
						isHebrew={isHebrew}
						isEmoji={isEmoji}
					/>

					<div className='row'>
						{['All', 'Undo', '⬇️', '⬆️', ' ', 'brown', 'green'].map((keyvalue, index) => (
							<div key={index} className={`key ${keyvalue === 'green' ? 'green-key' : (keyvalue === 'brown' ? 'brown-key' : (keyvalue === ' ' ? 'space' : (keyvalue === 'All' ? 'All-key' : ' ')))}`} onClick={() => handleKeyClick(keyvalue)} >
								<span>{keyvalue}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}