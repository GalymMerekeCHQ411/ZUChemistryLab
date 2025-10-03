body {
  font-family: Arial, sans-serif;
  background: #0d1b2a;
  color: #fca311;
  margin: 0;
  padding: 0;
  text-align: center;
}

header {
  background: #1b263b;
  padding: 20px;
}

.icon-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px;
}

.icon {
  padding: 10px 20px;
  background: #14213d;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.icon:hover {
  background: #fca311;
  color: #14213d;
}
.icon.active {
  background: #fca311;
  color: black;
  font-weight: bold;
}

.page { display: none; }
.page.active { display: block; }

.main-img {
  width: 400px;
  margin-top: 20px;
}

.exp-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.exp-card {
  background: #14213d;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
}
.exp-card:hover {
  background: #fca311;
  color: black;
}

.hidden { display: none; }
