import { useState, useEffect, useCallback } from "react";
import "./App.css";

const ADMIN_PASSWORD = "IndianStudies";
const REFRESH_PASSWORD = "refresh123"; // New refresh password

const foods = [
  // ... (your foods array remains the same)
  { name: "Idli", clues: ["Soft, white steamed cakes made from rice batter", "Healthy South Indian breakfast served with sambar", "Round, spongy, and always eaten with chutney"] },
  { name: "Dosa", clues: ["Thin, crispy golden crepe made from rice batter", "Famous South Indian dish shaped like a roll or cone", "Usually filled with potato masala inside"] },
  { name: "Samosa", clues: ["Crispy triangular fried pastry with potato filling", "Most common snack found at every Indian tea stall", "Best enjoyed hot with green or sweet chutney"] },
  { name: "Biryani", clues: ["Famous spicy rice dish cooked with meat or veg", "Known for its long grains and aromatic smell", "World-famous specialty of Hyderabad"] },
  { name: "Puri", clues: ["Deep-fried wheat bread that puffs up like a ball", "Golden, round, and soft breakfast favorite", "Always served with potato curry or bhaji"] },
  { name: "Vada", clues: ["Savory fried snack that looks like a donut", "Made from lentils and served with sambar", "Crispy on the outside, soft on the inside"] },
  { name: "Maggi", clues: ["Quick 2-minute noodles loved by students", "The ultimate late-night snack for everyone", "Yellow noodles cooked with a special Masala"] },
  { name: "Gulab Jamun", clues: ["Sweet brown balls soaked in sugar syrup", "Soft, juicy dessert served at every wedding", "Often eaten warm with vanilla ice cream"] },
  { name: "Pani Puri", clues: ["Small crispy balls filled with spicy herb water", "You eat it in one bite at a street stall", "Also called Golgappa or Puchka"] },
  { name: "Chapati", clues: ["Flat, round bread made from wheat flour", "Daily staple food eaten with curry or dal", "Also known as Roti or Phulka"] },
  { name: "Dal", clues: ["Yellow lentil soup tempered with spices", "Simple comfort food eaten with rice or roti", "Commonly called Pappu in Telugu"] },
  { name: "Curd Rice", clues: ["Soft rice mixed with yogurt and salt", "Cooling meal that ends every South Indian lunch", "Best eaten with mango or lemon pickle"] },
  { name: "Omelette", clues: ["Beaten eggs fried in a pan with onions", "Quick protein-rich breakfast or side dish", "Often eaten with bread or as a street snack"] },
  { name: "Upma", clues: ["Savory porridge made from roasted semolina", "Quick breakfast dish with peanuts and veggies", "Commonly called Uppittu in some regions"] },
  { name: "Pakoda", clues: ["Deep-fried onion or vegetable fritters", "Best snack to eat when it is raining outside", "Crispy, salty, and perfect with tea"] },
  { name: "Jalebi", clues: ["Orange-colored sweet spirals soaked in syrup", "Crispy, juicy, and shaped like a coil", "Traditional sweet sold at every local mela"] },
  { name: "Tea", clues: ["Most popular hot drink in India made with milk", "Brewed with sugar, tea leaves, and ginger", "Commonly called Chai by everyone"] },
  { name: "Pav Bhaji", clues: ["Mashed spicy veg curry served with buttered bread", "Famous Mumbai street food with lots of butter", "Served with chopped onions and a lemon slice"] },
  { name: "Laddu", clues: ["Round sweet ball made during festivals", "Yellow or orange color, usually made of besan", "The most famous prasad from Tirupati"] },
  { name: "Ice Cream", clues: ["Frozen sweet treat loved by kids and adults", "Comes in flavors like Vanilla, Chocolate, and Pista", "The best way to beat the Indian summer heat"] },
  { name: "Lemon Rice", clues: ["Yellow rice with a tangy, sour flavor", "Tempered with peanuts, curry leaves, and turmeric", "Quick lunch dish often called Chitranna"] },
  { name: "Bread Jam", clues: ["Simple snack made of two slices and a fruit spread", "Quickest tiffin option for school kids", "Sweet, red fruit spread on toasted or plain bread"] },
  { name: "Papad", clues: ["Thin, crunchy disc that is roasted or fried", "Side dish that adds crunch to your meal", "Known as Appadam in Telugu"] },
  { name: "Kheer", clues: ["Rice pudding made with milk and sugar", "Traditional dessert served at festivals", "Often garnished with almonds and raisins"] },
  { name: "Bajji", clues: ["Stuffed green chili or potato fried in batter", "Hot and spicy street snack served with onions", "A must-have snack at the beach or park"] },
  { name: "Poha", clues: ["Light breakfast made from flattened rice", "Cooked with turmeric, onions, and peanuts", "Very popular healthy snack in North India"] },
  { name: "Lassi", clues: ["Sweet, thick yogurt drink served chilled", "Famous Punjabi refreshment often topped with cream", "Served in a tall glass, especially in summer"] },
  { name: "Chicken 65", clues: ["Spicy, deep-fried red chicken cubes", "Popular appetizer served in restaurants", "Crispy starter with curry leaves and chilies"] },
  { name: "Khichdi", clues: ["Simple one-pot meal of rice and lentils", "Light food often given when someone is sick", "Healthy, mushy, and very easy to digest"] },
  { name: "Butter Chicken", clues: ["Creamy tomato chicken curry with lots of butter", "The most famous Indian curry worldwide", "Sweet and spicy gravy that goes best with Naan"] },
  { name: "Halwa", clues: ["Sweet, dense dessert made from carrot or moong dal", "Slow-cooked with ghee and sugar until soft", "Gajar version is very popular in winter"] },
];

const SCREEN = { LOGIN: "login", USERNAME: "username", GAME: "game", LEADERBOARD: "leaderboard" };

function useGame() {
  const [usedIndices, setUsedIndices] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);

  const getNextFood = useCallback(() => {
    const pool = usedIndices.length >= foods.length ? [] : usedIndices;
    const available = foods.map((_, i) => i).filter(i => !pool.includes(i));
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsedIndices(prev => (prev.length >= foods.length ? [idx] : [...prev, idx]));
    setCurrentFood(foods[idx]);
    return foods[idx];
  }, [usedIndices]);

  return { currentFood, getNextFood };
}

export default function App() {
  const [screen, setScreen] = useState(SCREEN.LOGIN);
  const [adminPass, setAdminPass] = useState("");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [cluesShown, setCluesShown] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(null);
  const { currentFood, getNextFood } = useGame();

  const startQuestion = () => {
    getNextFood();
    setUserAnswer("");
    setShowResult(false);
    setCluesShown(0);
  };

  useEffect(() => {
    const saved = localStorage.getItem("masalaLeaderboard");
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setScreen(SCREEN.USERNAME);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // Updated refresh function with password protection
  const handleRefreshLeaderboard = () => {
    const password = prompt("🔄 Enter Refresh Password to CLEAR Leaderboard:");
    if (password === REFRESH_PASSWORD) {
      localStorage.removeItem("masalaLeaderboard");
      setLeaderboard([]);
      alert("✅ Leaderboard REFRESHED! All scores cleared. Fresh start! 🎉");
    } else if (password !== null) {
      alert("❌ Wrong Refresh Password! Leaderboard unchanged.");
    }
  };

  // Simple load function (no longer used for refresh button)
  const loadLeaderboard = () => {
    const saved = localStorage.getItem("masalaLeaderboard");
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  };

  const handleUsernameSubmit = () => {
    if (!username.trim()) return;
    setScreen(SCREEN.GAME);
    setTimeout(startQuestion, 50);
  };

  const saveToLeaderboard = (finalScore, finalLevel) => {
    const entry = {
      name: username,
      score: finalScore,
      level: finalLevel,
      date: new Date().toLocaleDateString("en-IN"),
    };
    const updated = [entry, ...leaderboard.filter(e => e.name !== username)]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem("masalaLeaderboard", JSON.stringify(updated));
    setLeaderboard(updated);
  };

  const handleSubmit = () => {
    if (!userAnswer.trim() || showResult) return;
    const isCorrect =
      userAnswer.trim().toLowerCase() === currentFood.name.toLowerCase();
    setShowResult(true);
    if (isCorrect) {
      const pts = 25 - cluesShown * 5;
      const newScore = score + pts;
      const newLevel = level + 1;
      setScore(newScore);
      setLevel(newLevel);
      setFlash("correct");
      saveToLeaderboard(newScore, newLevel);
    } else {
      setFlash("wrong");
    }
    setTimeout(() => setFlash(null), 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const showClue = (n) => {
    if (cluesShown < n) setCluesShown(n);
  };

  const pts = currentFood ? 25 - cluesShown * 5 : 25;
  const isCorrect =
    showResult &&
    currentFood &&
    userAnswer.trim().toLowerCase() === currentFood.name.toLowerCase();

  return (
    <div className={`app${flash ? ` flash-${flash}` : ""}`}>
      {/* ── ADMIN LOGIN ── */}
      {screen === SCREEN.LOGIN && (
        <div className="card">
          <div className="login-header">
            <div className="login-emoji">🥘</div>
            <div className="login-title">Masala Mahal</div>
            <div className="login-subtitle">Admin Login Required</div>
          </div>
          <div className="login-body">
            <label className="login-label">Password</label>
            <input
              className={`login-input${shake ? " shake" : ""}`}
              type="password"
              placeholder="Enter admin password"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              autoFocus
            />
            <button className="btn-primary" onClick={handleAdminLogin}>
              Enter Game ✦
            </button>
            <div className="login-subtitle indian-studies">Indian Studies</div>
          </div>
        </div>
      )}

      {/* ── USERNAME ── */}
      {screen === SCREEN.USERNAME && (
        <div className="card">
          <div className="login-header">
            <div className="login-emoji">👤</div>
            <div className="login-title">Who's Playing?</div>
            <div className="login-subtitle">Your name appears on the leaderboard</div>
          </div>
          <div className="login-body">
            <label className="login-label">Your Name</label>
            <input
              className="login-input"
              type="text"
              placeholder="e.g. Mohith , Jayanth , Azu ..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleUsernameSubmit()}
              maxLength={20}
              autoFocus
            />
            <button
              className="btn-primary"
              onClick={handleUsernameSubmit}
              disabled={!username.trim()}
            >
              Start Playing 🎮
            </button>
          </div>
        </div>
      )}

      {/* ── GAME ── */}
      {screen === SCREEN.GAME && currentFood && (
        <div className="game-wrap">
          <div className="topbar">
            <div className="brand">🍲 Masala Mahal</div>
            <div className="user-chip">
              <span>👤 {username}</span>
              <button className="lb-btn" onClick={() => setScreen(SCREEN.LEADERBOARD)}>
                🏆  Leaderboard
              </button>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-val">{score}</div>
              <div className="stat-lbl">Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-val">{level}</div>
              <div className="stat-lbl">Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💡</div>
              <div className="stat-val">{cluesShown}/2</div>
              <div className="stat-lbl">Clues</div>
            </div>
          </div>

          <div className="q-card">
            <div className="q-card-top">
              <span className="q-tag">Which dish is this?</span>
              <span className="pts-tag">+{pts} pts</span>
            </div>
            <div className="clue-text">"{currentFood.clues[0]}"</div>
            {cluesShown >= 1 && (
              <div className="clue-extra">
                <strong>Clue - 1:</strong> {currentFood.clues[1]}
              </div>
            )}
            {cluesShown >= 2 && (
              <div className="clue-extra">
                <strong>Clue - 2:</strong> {currentFood.clues[2]}
              </div>
            )}
          </div>

          <div className="input-row">
            <input
              className="answer-input"
              type="text"
              placeholder="Type the dish name..."
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={showResult}
              autoFocus
            />
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || showResult}
            >
              Submit ✓
            </button>
          </div>

          {!showResult && (
            <div className="clue-btns">
              <button
                className={`clue-btn ${cluesShown >= 1 ? "used" : "available"}`}
                onClick={() => showClue(1)}
                disabled={cluesShown >= 1}
              >
                💡 Clue-1 (−5 pts)
              </button>
              <button
                className={`clue-btn ${cluesShown >= 2 ? "used" : cluesShown < 1 ? "used" : "available"}`}
                onClick={() => showClue(2)}
                disabled={cluesShown >= 2 || cluesShown < 1}
                title={cluesShown < 1 ? "Reveal Clue 1 first" : ""}
              >
                💡 Clue-2 (−5 pts)
              </button>
            </div>
          )}

          {showResult && (
            <>
              <div className={`result-block ${isCorrect ? "correct" : "wrong"}`}>
                <div className="result-verdict">
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                </div>
                <div className="result-answer">
                  The dish was: <strong>{currentFood.name}</strong>
                  {!isCorrect && (
                    <>
                      <br />
                      You answered: <strong>"{userAnswer}"</strong>
                    </>
                  )}
                </div>
                {isCorrect && (
                  <div className="pts-earned">+{pts} points earned!</div>
                )}
              </div>
              <button className="next-btn" onClick={startQuestion}>
                Next Question ➡
              </button>
            </>
          )}
        </div>
      )}

      {/* ── LEADERBOARD OVERLAY ── */}
      {screen === SCREEN.LEADERBOARD && (
        <div className="overlay" onClick={() => setScreen(SCREEN.GAME)}>
          <div className="lb-card" onClick={e => e.stopPropagation()}>
            <div className="lb-head">
              <div 
                className="lb-title" 
                onDoubleClick={() => {
                  const pass = prompt("Admin Reset Password:");
                  if (pass === "1234") {
                    localStorage.removeItem("masalaLeaderboard");
                    setLeaderboard([]);
                    alert("Admin Reset Complete! ✅");
                  }
                }}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                🏆 Top Players
              </div>

              <div className="lb-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  className="refresh-btn" 
                  onClick={handleRefreshLeaderboard}
                  title="🔄 Click to CLEAR & Reset Leaderboard (Password Required)"
                  style={{ 
                    padding: '8px 12px', 
                    fontSize: '16px',
                    borderRadius: '6px',
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  🔄
                </button>
                <button className="close-btn" onClick={() => setScreen(SCREEN.GAME)}>
                  ✕
                </button>
              </div>
            </div>

            <div className="lb-list">
              {leaderboard.length === 0 ? (
                <div className="lb-empty">No scores yet — be the first! 🌟</div>
              ) : (
                leaderboard.map((p, i) => (
                  <div key={i} className={`lb-row${p.name === username ? " me" : ""}`}>
                    <span className={`lb-rank${i < 3 ? " top" : ""}`}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </span>
                    <span className="lb-name">{p.name}</span>
                    <span className="lb-score">{p.score}</span>
                    <span className="lb-date">{p.date}</span>
                  </div>
                ))
              )}
            </div>

            <div className="lb-foot">
              Your rank : <strong>{leaderboard.findIndex(p => p.name === username) + 1 || "—"}</strong>
              &nbsp;||&nbsp; Score : <strong>{score}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}