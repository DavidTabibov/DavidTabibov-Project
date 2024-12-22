class TriviaGame {
    constructor() {
        // Update constructor to include new state properties
        this.POINTS_PER_CORRECT_ANSWER = 10;

        this.questions = {
            general: {
                easy: [
                    {
                        question: "מהו ההמנון הלאומי של ישראל?",
                        answers: ["שיר הפלמ\"ח", "התקווה", "ירושלים של זהב", "שיר השלום"],
                        correct: 1,
                        explanation: "התקווה הוא ההמנון הלאומי של מדינת ישראל מאז הקמתה"
                    },
                    {
                        question: "מה היא עיר הבירה של ישראל?",
                        answers: ["תל אביב", "ירושלים", "חיפה", "באר שבע"],
                        correct: 1,
                        explanation: "ירושלים היא בירת ישראל מאז הקמת המדינה"
                    },
                    {
                        question: "כמה שבטים היו בעם ישראל?",
                        answers: ["10", "12", "8", "15"],
                        correct: 1,
                        difficulty: "easy",
                        explanation: "בעם ישראל היו 12 שבטים."
                    },
                    {
                        question: "מהו הפרח הלאומי של ישראל?",
                        answers: ["כלנית", "נרקיס", "חרצית", "רקפת"],
                        correct: 0,
                        explanation: "הכלנית האדומה היא הפרח הלאומי של מדינת ישראל"
                    },
                    {
                        question: "מה שמו של המטבע הישראלי?",
                        answers: ["לירה", "דינר", "שקל חדש", "אגורה"],
                        correct: 2,
                        explanation: "השקל החדש הוא המטבע הרשמי של ישראל מאז 1985"
                    }
                ],
                medium: [
                    {
                        question: "מי היה ראש הממשלה הראשון של ישראל?",
                        answers: ["משה שרת", "דוד בן-גוריון", "גולדה מאיר", "מנחם בגין"],
                        correct: 1,
                        difficulty: "medium",
                        explanation: "דוד בן-גוריון היה ראש הממשלה הראשון של ישראל."
                    },
                    {
                        question: "באיזו שנה נחקק חוק השבות?",
                        answers: ["1948", "1950", "1952", "1954"],
                        correct: 1,
                        explanation: "חוק השבות נחקק בשנת 1950 ומעניק לכל יהודי את הזכות לעלות לישראל"
                    },
                    {
                        question: "באיזו שנה נחתם הסכם השלום עם ירדן?",
                        answers: ["1992", "1993", "1994", "1995"],
                        correct: 2,
                        explanation: "הסכם השלום עם ירדן נחתם ב-26 באוקטובר 1994"
                    }
                ],
                hard: [
                    {
                        question: "מי היה ראש הממשלה בזמן חתימת הסכם השלום עם ירדן?",
                        answers: ["יצחק רבין", "שמעון פרס", "בנימין נתניהו", "אהוד ברק"],
                        correct: 0,
                        explanation: "יצחק רבין חתם על הסכם השלום עם ירדן ב-26 באוקטובר 1994"
                    },
                    {
                        question: "באיזו שנה הוקם המוסד?",
                        answers: ["1949", "1950", "1951", "1952"],
                        correct: 1,
                        explanation: "המוסד הוקם בדצמבר 1949 על ידי ראש הממשלה דוד בן-גוריון"
                    },
                    {
                        question: "מי היה שר החוץ הראשון של מדינת ישראל?",
                        answers: ["משה שרת", "גולדה מאיר", "אבא אבן", "משה דיין"],
                        correct: 0,
                        explanation: "משה שרת היה שר החוץ הראשון של ישראל ולאחר מכן גם ראש הממשלה השני"
                    },
                    {
                        question: "באיזו שנה נחקק חוק יסוד: הכנסת?",
                        answers: ["1955", "1957", "1958", "1960"],
                        correct: 2,
                        explanation: "חוק יסוד: הכנסת נחקק בשנת 1958 והיה חוק היסוד הראשון במדינת ישראל"
                    },
                    {
                        question: "מי היה הרמטכ\"ל במלחמת ששת הימים?",
                        answers: ["משה דיין", "יצחק רבין", "חיים בר-לב", "דוד אלעזר"],
                        correct: 1,
                        explanation: "יצחק רבין היה הרמטכ\"ל במלחמת ששת הימים בשנת 1967"
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "באיזו שנה הוקמה מדינת ישראל?",
                        answers: ["1947", "1948", "1949", "1950"],
                        correct: 1,
                        difficulty: "easy",
                        explanation: "מדינת ישראל הוקמה בשנת 1948."
                    },
                    {
                        question: "מתי הסתיימה מלחמת העצמאות?",
                        answers: ["1948", "1949", "1950", "1951"],
                        correct: 1,
                        explanation: "מלחמת העצמאות הסתיימה רשמית עם הסכמי שביתת הנשק ב-1949"
                    }
                ],
                medium: [
                    {
                        question: "מתי הוקם שדה התעופה הראשון בישראל?",
                        answers: ["1936", "1937", "1938", "1939"],
                        correct: 0,
                        explanation: "שדה התעופה בלוד (כיום נתב\"ג) הוקם ב-1936 על ידי הבריטים"
                    }
                ],
                hard: [
                    {
                        question: "באיזו שנה הוקם ארגון ההגנה?",
                        answers: ["1920", "1921", "1922", "1923"],
                        correct: 0,
                        explanation: "ארגון ההגנה הוקם ביוני 1920 בתגובה למאורעות תר\"פ"
                    },
                    {
                        question: "מי היה מפקד מבצע חומת מגן?",
                        answers: ["שאול מופז", "משה יעלון", "דן חלוץ", "בוגי יעלון"],
                        correct: 1,
                        explanation: "רב-אלוף משה (בוגי) יעלון היה הרמטכ\"ל ומפקד מבצע חומת מגן בשנת 2002"
                    },
                    {
                        question: "באיזו שנה התקיים משפט אייכמן?",
                        answers: ["1960", "1961", "1962", "1963"],
                        correct: 1,
                        explanation: "משפט אייכמן התקיים בירושלים בשנת 1961 ונמשך כחמישה חודשים"
                    },
                    {
                        question: "מי היה מייסד תנועת המזרחי?",
                        answers: ["הרב יצחק ניסנבוים", "הרב יעקב ריינס", "הרב מאיר בר-אילן", "הרב אברהם יצחק הכהן קוק"],
                        correct: 1,
                        explanation: "הרב יעקב ריינס ייסד את תנועת המזרחי בשנת 1902"
                    }
                ]
            },
            geography: {
                easy: [
                    {
                        question: "מהו הים הגדול ביותר שגובל בישראל?",
                        answers: ["ים המלח", "ים סוף", "הים התיכון", "הכנרת"],
                        correct: 2,
                        explanation: "הים התיכון הוא הים הגדול ביותר הגובל בישראל, לאורך כל החוף המערבי"
                    },
                    {
                        question: "איזה נחל הוא הארוך ביותר בישראל?",
                        answers: ["נחל הבשור", "נחל צין", "נחל פארן", "נחל הערבה"],
                        correct: 0,
                        explanation: "נחל הבשור הוא הנחל הארוך ביותר בישראל, באורך של כ-120 ק\"מ"
                    },
                    {
                        question: "מהי הנקודה הנמוכה ביותר בעולם הנמצאת בישראל?",
                        answers: ["מכתש רמון", "ים המלח", "הערבה", "בקעת הירדן"],
                        correct: 1,
                        explanation: "ים המלח, בגובה של כ-430 מטר מתחת לפני הים, הוא המקום הנמוך ביותר ביבשה בעולם"
                    },
                    // ...rest of geography.easy questions...
                ],
                medium: [
                    {
                        question: "מה אורכו של מדבר הנגב (בקמ\"ר)?",
                        answers: ["10,000", "12,000", "13,000", "14,000"],
                        correct: 2,
                        explanation: "מדבר הנגב משתרע על פני כ-13,000 קמ\"ר ומהווה כ-60% משטח המדינה"
                    },
                    {
                        question: "מה שטחו של מכתש רמון?",
                        answers: ["25 קמ\"ר", "40 קמ\"ר", "45 קמ\"ר", "50 קמ\"ר"],
                        correct: 2,
                        explanation: "מכתש רמון משתרע על שטח של כ-45 קמ\"ר והוא המכתש הגדול בעולם"
                    },
                    // ...rest of geography.medium questions...
                ],
                hard: [
                    {
                        question: "מהו שמו של קו השבר הגיאולוגי העובר לאורך בקע ים המלח?",
                        answers: ["שבר סורי-אפריקני", "שבר ים המלח", "שבר הערבה", "שבר הירדן"],
                        correct: 0,
                        explanation: "השבר הסורי-אפריקני הוא קו שבר גיאולוגי המשתרע מטורקיה ועד מזרח אפריקה"
                    },
                    // ...rest of geography.hard questions...
                ]
            },
            science: {
                easy: [
                    {
                        question: "מי המציא את הטפטפות?",
                        answers: ["שמחה בלאס", "נתן שרון", "דן זסלבסקי", "רפי מהודר"],
                        correct: 0,
                        explanation: "שמחה בלאס המציא את שיטת ההשקיה בטפטפות ב-1959"
                    },
                    {
                        question: "איזו חברה ישראלית פיתחה את תוכנת Waze?",
                        answers: ["מובילאיי", "גוגל ישראל", "ווייז מובייל", "סייבר ארק"],
                        correct: 2,
                        explanation: "Waze פותחה על ידי חברת ווייז מובייל הישראלית לפני שנרכשה על ידי גוגל"
                    },
                    // ...rest of new science.easy questions...
                ],
                medium: [
                    {
                        question: "איזו תרופה ישראלית משמשת לטיפול בטרשת נפוצה?",
                        answers: ["קופקסון", "אקמולי", "רפאסול", "אבוטרול"],
                        correct: 0,
                        explanation: "הקופקסון פותח במכון ויצמן למדע ומשמש לטיפול בטרשת נפוצה"
                    },
                    {
                        question: "מי פיתח את מערכת ההתראה מפני רעידות אדמה בישראל?",
                        answers: ["המכון הגיאולוגי", "מכון ויצמן", "הטכניון", "האוניברסיטה העברית"],
                        correct: 0,
                        explanation: "המכון הגיאולוגי פיתח את מערכת תרועה להתראה מפני רעידות אדמה"
                    },
                    // ...rest of new science.medium questions...
                ],
                hard: [
                    {
                        question: "מי פיתח את שיטת האבטחה RSA?",
                        answers: ["עדי שמיר", "מיכאל רבין", "שמעון אולמן", "נוגה אלון"],
                        correct: 0,
                        explanation: "פרופ' עדי שמיר היה שותף בפיתוח אלגוריתם ההצפנה RSA"
                    },
                    {
                        question: "באיזו שנה התגלה מבנה הקוואזי-גביש?",
                        answers: ["1982", "1984", "1986", "1988"],
                        correct: 0,
                        explanation: "דן שכטמן גילה את מבנה הקוואזי-גביש בשנת 1982 וזכה על כך בפרס נובל"
                    },
                    {
                        question: "מי פיתח את התרופה הראשונה לטיפול בטרשת נפוצה?",
                        answers: ["מיכאל סלע", "רות ארנון", "מישל רבל", "דוד גיבור"],
                        correct: 1,
                        explanation: "פרופ' רות ארנון פיתחה את הקופקסון, התרופה הראשונה לטיפול בטרשת נפוצה"
                    },
                    {
                        question: "איזה מדען ישראלי פיתח את הננו-ביולוגיה?",
                        answers: ["אהרון צ'חנובר", "עדה יונת", "אברהם הרשקו", "רפאל משולם"],
                        correct: 0,
                        explanation: "פרופ' אהרון צ'חנובר היה חלוץ בתחום הננו-ביולוגיה וזכה בפרס נובל"
                    },
                    {
                        question: "מי גילה את מערכת האוביקויטין?",
                        answers: ["אברהם הרשקו ואהרון צ'חנובר", "עדה יונת", "דן שכטמן", "מיכאל לויט"],
                        correct: 0,
                        explanation: "פרופ' הרשקו ופרופ' צ'חנובר גילו את מערכת האוביקויטין וזכו על כך בפרס נובל בכימיה"
                    }
                ]
            }
        };

        // עדכון מצב המשחק
        this.currentState = {
            category: null,
            difficulty: null,
            score: 0,
            questionIndex: 0,
            correctAnswers: 0,
            timer: null,
            timeLeft: 30,
            currentQuestions: [],
            totalQuestions: 0,
            answeredQuestions: new Set(),
            isAnswerSelected: false,
            questionsAnswered: 0,
            currentCategory: null,
            currentDifficulty: null
        };

        // אלמנטים בדף
        this.elements = {
            screens: {
                welcome: document.getElementById('welcome-screen'),
                game: document.getElementById('game-screen'),
                summary: document.getElementById('summary-screen')
            },
            categoryBtns: document.querySelectorAll('.category-btn'),
            difficultyBtns: document.querySelectorAll('.difficulty-btn'),
            startBtn: document.getElementById('startBtn'),
            question: document.getElementById('question'),
            answers: document.getElementById('answers'),
            questionNumber: document.getElementById('questionNumber'),
            score: document.getElementById('score'),
            timer: {
                bar: document.getElementById('timerBar'),
                value: document.getElementById('timerValue')
            },
            summary: {
                finalScore: document.getElementById('finalScore'),
                correctAnswers: document.getElementById('correctAnswers'),
                avgTime: document.getElementById('avgTime'),
                accuracy: document.getElementById('accuracy')
            },
            playAgainBtn: document.getElementById('playAgainBtn'),
            homeBtn: document.getElementById('homeBtn')
        };

        this.bindEvents();
        this.updateQuestionCounts(); // הוספת קריאה לפונקציה חדשה
        this.updateStyles();
    }

    bindEvents() {
        // אירועי בחירת קטגוריה וקושי
        this.elements.categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectCategory(btn));
        });

        this.elements.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectDifficulty(btn));
        });

        // אירועי כפתורים
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.elements.homeBtn.addEventListener('click', () => this.showScreen('welcome'));
    }

    // פונקציה חדשה להצגת מספר השאלות
    updateQuestionCounts() {
        Object.keys(this.questions).forEach(category => {
            Object.keys(this.questions[category]).forEach(difficulty => {
                const count = this.questions[category][difficulty].length;
                const btn = document.querySelector(`[data-category="${category}"][data-difficulty="${difficulty}"]`);
                if (btn) {
                    const countBadge = document.createElement('span');
                    countBadge.className = 'question-count';
                    countBadge.textContent = `${count} שאלות`;
                    btn.appendChild(countBadge);
                }
            });
        });
    }

    selectCategory(btn) {
        // הסרת הבחירה הקודמת
        this.elements.categoryBtns.forEach(b => b.classList.remove('selected'));
        // הוספת הבחירה החדשה
        btn.classList.add('selected');
        this.currentState.category = btn.dataset.category;
        this.updateAvailableDifficulties();
        this.checkStartButton();
    }

    selectDifficulty(btn) {
        this.elements.difficultyBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.currentState.difficulty = btn.dataset.difficulty;
        this.checkStartButton();
    }

    checkStartButton() {
        this.elements.startBtn.disabled = !(this.currentState.category && this.currentState.difficulty);
    }

    // פונקציה חדשה לעדכון רמות קושי זמינות
    updateAvailableDifficulties() {
        const availableDifficulties = Object.keys(this.questions[this.currentState.category]);
        this.elements.difficultyBtns.forEach(btn => {
            const difficulty = btn.dataset.difficulty;
            const isAvailable = availableDifficulties.includes(difficulty) &&
                this.questions[this.currentState.category][difficulty].length > 0;
            btn.disabled = !isAvailable;
            btn.classList.toggle('disabled', !isAvailable);
        });
    }

    startGame() {
        if (!this.currentState.category || !this.currentState.difficulty) return;

        const availableQuestions = this.questions[this.currentState.category][this.currentState.difficulty]
            .filter(q => !this.currentState.answeredQuestions.has(q.question));

        if (availableQuestions.length === 0) {
            this.currentState.answeredQuestions.clear();
        }

        this.currentState.currentQuestions = this.getRandomQuestions(availableQuestions);
        this.currentState.totalQuestions = this.currentState.currentQuestions.length;

        this.currentState.questionIndex = 0;
        this.currentState.score = 0;
        this.currentState.correctAnswers = 0;

        this.showScreen('game');
        this.loadQuestion();
    }

    // פונקציה חדשה לבחירת שאלות אקראיות
    getRandomQuestions(questions) {
        const numQuestions = Math.min(10, questions.length);
        return [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, numQuestions);
    }

    loadQuestion() {
        const question = this.currentState.currentQuestions[this.currentState.questionIndex];

        // עדכון מספר השאלה
        this.elements.questionNumber.textContent =
            `${this.currentState.questionIndex + 1}/${this.currentState.currentQuestions.length}`;

        // הצגת השאלה
        this.elements.question.textContent = question.question;

        // יצירת כפתורי תשובות
        this.elements.answers.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.disabled = false;
            button.style.pointerEvents = 'auto';

            button.addEventListener('click', () => {
                this.handleAnswerSelection(index, question);
            });

            this.elements.answers.appendChild(button);
        });

        // Reset answer selection state
        this.currentState.isAnswerSelected = false;

        this.startTimer();
    }

    startTimer() {
        this.currentState.timeLeft = 30;
        this.updateTimerDisplay();

        if (this.currentState.timer) clearInterval(this.currentState.timer);

        this.currentState.timer = setInterval(() => {
            this.currentState.timeLeft--;
            this.updateTimerDisplay();

            if (this.currentState.timeLeft <= 0) {
                this.handleTimeout();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const percentage = (this.currentState.timeLeft / 30) * 100;
        this.elements.timer.bar.style.width = `${percentage}%`;
        this.elements.timer.value.textContent = this.currentState.timeLeft;
    }

    handleAnswerSelection(selectedIndex, questionData) {
        if (this.currentState.isAnswerSelected) return;

        clearInterval(this.currentState.timer);
        this.currentState.isAnswerSelected = true;
        this.currentState.questionsAnswered++;

        const answerButtons = this.elements.answers.querySelectorAll('.answer-btn');
        const isCorrect = selectedIndex === questionData.correct;

        // Update UI and add points
        if (isCorrect) {
            this.currentState.correctAnswers++;
            this.updateScore();
        }

        this.updateUI(selectedIndex, questionData.correct);
        this.showFeedback(isCorrect, questionData.explanation);

        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    // Add new updateScore method
    updateScore() {
        this.currentState.score += this.POINTS_PER_CORRECT_ANSWER;
        const scoreElement = this.elements.score;

        scoreElement.classList.add('score-update');
        scoreElement.textContent = this.currentState.score;

        setTimeout(() => {
            scoreElement.classList.remove('score-update');
        }, 500);
    }

    // Update showFeedback method
    showFeedback(isCorrect, explanation) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;

        feedbackElement.innerHTML = `
            <div class="feedback-header">
                ${isCorrect ?
                `✅ תשובה נכונה! (+${this.POINTS_PER_CORRECT_ANSWER} נקודות)` :
                '❌ תשובה שגויה'}
            </div>
            <div class="feedback-explanation">
                ${explanation}
            </div>
            <div class="feedback-stats">
                <div class="current-score">ניקוד: ${this.currentState.score}</div>
                <div class="stats-details">
                    קטגוריה: ${this.currentState.category} | 
                    רמת קושי: ${this.currentState.difficulty}
                </div>
            </div>
        `;

        document.body.appendChild(feedbackElement);
        setTimeout(() => feedbackElement.remove(), 1900);
    }

    // Add new updateUI method
    updateUI(selectedIndex, correctIndex) {
        const answerButtons = this.elements.answers.querySelectorAll('.answer-btn');

        answerButtons.forEach(button => {
            button.disabled = true;
            button.style.pointerEvents = 'none';
        });

        answerButtons[selectedIndex].classList.add(selectedIndex === correctIndex ? 'correct' : 'wrong');
        if (selectedIndex !== correctIndex) {
            answerButtons[correctIndex].classList.add('correct');
        }
    }

    handleTimeout() {
        clearInterval(this.currentState.timer);
        const buttons = this.elements.answers.querySelectorAll('.answer-btn');
        const question = this.currentState.currentQuestions[this.currentState.questionIndex];

        buttons[question.correct].classList.add('correct');
        setTimeout(() => this.nextQuestion(), 1500);
    }

    nextQuestion() {
        this.currentState.questionIndex++;

        if (this.currentState.questionIndex >= this.currentState.currentQuestions.length) {
            this.endGame();
        } else {
            this.loadQuestion();
        }
    }

    endGame() {
        // עדכון סטטיסטיקות
        this.elements.summary.finalScore.textContent = this.currentState.score;
        this.elements.summary.correctAnswers.textContent =
            `${this.currentState.correctAnswers}/${this.currentState.currentQuestions.length}`;
        this.elements.summary.accuracy.textContent =
            `${Math.round((this.currentState.correctAnswers / this.currentState.currentQuestions.length) * 100)}%`;

        this.showScreen('summary');
    }

    resetGame() {
        this.currentState = {
            category: null,
            difficulty: null,
            score: 0,
            questionIndex: 0,
            correctAnswers: 0,
            timer: null,
            timeLeft: 30,
            currentQuestions: [],
            totalQuestions: 0,
            answeredQuestions: new Set()
        };

        this.elements.categoryBtns.forEach(btn => btn.classList.remove('selected'));
        this.elements.difficultyBtns.forEach(btn => btn.classList.remove('selected'));
        this.elements.score.textContent = '0';

        this.showScreen('welcome');
    }

    showScreen(screenName) {
        // הסתרת כל המסכים
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        // הצגת המסך הנבחר
        this.elements.screens[screenName].classList.add('active');
    }

    updateStyles() {
        const existingStyles = `
            .question-container {
                background: rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 2rem;
                margin: 2rem auto;
                max-width: 800px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }

            .question-text {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                line-height: 1.4;
                color: var(--text);
            }

            .answers-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                margin-top: 2rem;
            }

            .answer-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                font-size: 1.1rem;
                color: var(--text);
                transition: all 0.3s ease;
                cursor: pointer;
                text-align: right;
            }

            .answer-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }

            .answer-feedback {
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
                animation: slideUp 0.3s ease;
            }

            @keyframes slideUp {
                from { transform: translate(-50%, 100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }

            .difficulty-badge {
                display: inline-flex;
                align-items: center;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }

            .difficulty-easy { background: var(--success); }
            .difficulty-medium { background: var(--primary); }
            .difficulty-hard { background: var(--error); }

            @media (max-width: 768px) {
                .answers-grid {
                    grid-template-columns: 1fr;
                }

                .question-text {
                    font-size: 1.2rem;
                }
            }

            .feedback {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideFeedback 0.3s ease;
                max-width: 90%;
                width: 400px;
                text-align: center;
                z-index: 1000;
            }

            .feedback.correct {
                background-color: #10b981;
                color: white;
            }

            .feedback.wrong {
                background-color: #ef4444;
                color: white;
            }

            .feedback-header {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 8px;
            }

            .feedback-explanation {
                font-size: 1rem;
                line-height: 1.4;
            }

            .answer-btn.correct {
                background-color: rgba(16, 185, 129, 0.2);
                border: 2px solid #10b981;
            }

            .answer-btn.wrong {
                background-color: rgba(239, 68, 68, 0.2);
                border: 2px solid #ef4444;
            }

            @keyframes slideFeedback {
                from {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }

            .answer-btn {
                transition: all 0.3s ease;
            }

            .answer-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .answer-btn.correct {
                background-color: rgba(16, 185, 129, 0.2);
                border: 2px solid #10b981;
                transform: scale(1.02);
            }

            .answer-btn.wrong {
                background-color: rgba(239, 68, 68, 0.2);
                border: 2px solid #ef4444;
                transform: scale(0.98);
            }

            .feedback {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                animation: slideFeedback 0.3s ease;
                min-width: 300px;
                max-width: 90%;
                text-align: center;
                z-index: 1000;
            }

            .feedback.correct {
                background-color: #10b981;
                color: white;
            }

            .feedback.wrong {
                background-color: #ef4444;
                color: white;
            }

            .feedback-next {
                margin-top: 10px;
                font-size: 0.9rem;
                opacity: 0.8;
            }

            @keyframes slideFeedback {
                from {
                    transform: translate(-50%, 100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }

            #score {
                font-size: 1.5rem;
                font-weight: bold;
                color: #ffd700;
                transition: all 0.3s ease;
            }

            .score-update {
                animation: scoreUpdate 0.5s ease;
            }

            @keyframes scoreUpdate {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }

            .feedback-score {
                margin-top: 10px;
                font-weight: bold;
                font-size: 1.2rem;
                color: #a7f3d0;
            }

            .wrong .feedback-score {
                color: #fca5a5;
            }
        `;

        const newStyles = `
            .score-container {
                background: rgba(255, 255, 255, 0.1);
                padding: 10px 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }

            .score-label {
                font-size: 1.2rem;
                color: #94a3b8;
            }

            #score {
                font-size: 2rem;
                font-weight: bold;
                color: #ffd700;
                transition: all 0.3s ease;
            }

            .score-update {
                animation: scoreUpdate 0.5s ease;
            }

            .feedback-stats {
                margin-top: 15px;
                padding-top: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
            }

            .current-score {
                font-size: 1.3rem;
                font-weight: bold;
                color: #ffd700;
            }

            .stats-details {
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 5px;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = existingStyles + newStyles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize game when document loads
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});
