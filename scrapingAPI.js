const express = require('express');
const path = require("path")
const app = express();
const frontEndApp = express()
const puppeteer = require("puppeteer")
const cors = require('cors')
app.use(cors())
app.use(express.json());
const appPort = 3000; // Portul pe care doriți să ruleze
const frontEndAppPort=3001 
app.listen(appPort, () => {
  console.log(`Serverul Express rulează pe portul ${appPort}`);
});
frontEndApp.listen(frontEndAppPort, () => {
  console.log(`Serverul Express rulează pe portul ${frontEndAppPort}`);
});

let positiveWords = ["Happy", "Elated", "Excited", "Joy", "Alive", "Thrilled", "Ecstatic", "Overjoyed", "Blissful", "Exhilarated", "Animated", "Rapturous", "Euphoric", "Amazed", "Astonished", "Delighted", "Pleased", "Cheerful", "Jolly", "Jovial", "Rejoicing", "Merriment", "Jubilation", "Gleeful", "Gaiety", "Vivacity", "Vibrant", "Triumphant", "Victorious", "Glorious", "Exultant", "Exuberance", "Spirited", "Energetic", "Bouncing", "Festive", "Gay", "Gladness", "Enraptured", "Beaming", "Light-hearted", "Musical", "Mirthful", "Elevated", "Bubbly", "Upbeat", "Splendid", "Overflowing", "Satiable", "Buoyant", "Jaunty", "Interested", "Surprised", "Awe", "Breathtaken", "Awe-Inspiring", "Attracted", "Motivated", "Aroused", "Enthused", "Encouraged", "Stimulated", "Stirred", "Moved", "Terrific", "Funny", "Humorous", "Hilarious", "Smiling", "Comical", "Witty", "Amusing", "Entertaining", "Engaging", "Compelling", "Applauding", "Laud", "Praising", "Enthusiastic", "Acclaimed", "Entranced", "Spellbound", "Awestruck", "Captivated", "Fascinated", "Mesmerizing", "Enticing", "Alluring", "Tantalizing", "Inviting", "Curious", "Eager", "Inquisitive", "Touched", "Astounded", "Attentive", "Intrigued", "Thought-provoking", "Bedazzled", "Bemused", "Stunned", "Impressed", "Favorable", "Intoxicating", "Perky", "Fantastic", "Climactic", "Stirred", "Roused", "Invigorated", "Gripped", "Sensational", "Explosive", "Electrifying", "Mind-blown", "Heart-warming", "Influential", "Marvelous", "Masterful", "Encompassing", "Refreshing", "Abundant", "Overrated", "Affluent", "Pioneering", "Incredible", "Colorful", "Eye-catching", "Anticipated", "Artistic", "Delectable", "Appetizing", "Mouth-watering", "Intelligent", "Cinematic", "Novel", "Enormous", "Exceptional", "Fragrant", "Luminous", "Luxurious", "Limitless", "Heavenly", "Innovative", "Timely", "Wonderful", "Mystical", "Ethereal", "Magical", "Otherworldly", "Love", "Loved", "Empathy", "Friendly", "Crush", "Adorable", "Admiration", "Idolize", "Worship", "Caring", "Devoted", "Reverence", "Faithful", "Trusting", "Loyal", "Commitment", "Dedication", "Pleasurable", "Charming", "Appealing", "Amiable", "Charismatic", "Likable", "Supportive", "Empowering", "Uplifted", "Helpful", "Sympathetic", "Understanding", "Kind", "Accommodating", "Approachable", "Honorable", "Agreeable", "Hospitable", "Respectful", "Courteous", "Polite", "Cooperative", "Compassionate", "Graceful", "Desire", "Charity", "Sensual", "Sincerity", "Sweetness", "Generous", "Magnanimity", "Warmth", "Altruism", "Edified", "Allegiance", "Romantic", "Thirst", "Appetite", "Smitten", "Noble", "Harmonious", "Merciful", "Moral", "Decent", "Honest", "Infatuated", "Unfailing", "Healthy", "Thriving", "Vigorous", "Desirable", "Gentle", "Guarded", "Sanctified", "Fortified", "Courage", "Positivity", "Hope", "Trust", "Faith", "Humility", "Inspired", "Determination", "Willpower", "Resolve", "Purpose-driven", "Resourcefulness", "Tenacity", "Steadfastness", "Diligence", "Persistence", "Trustworthiness", "Fortitude", "Grit", "Driven", "Insistence", "Resoluteness", "Focused", "Optimistic", "Thoughtfulness", "Considerate", "Enthusiasm", "Adventurism", "Unfazed", "Intent", "Decisiveness", "Bravery", "Daring", "Endurance", "Resiliency", "Toughness", "Unwavering", "Patience", "Industriousness", "Diligence", "Zeal", "Passionate", "Successful", "Craving", "Anticipating", "Attentiveness", "Boldness", "Adaptable", "Idealistic", "Expressive", "Efficiency", "Reliability", "Perseverance", "Welcoming", "Capable", "Willing", "Fearless", "Ingenuity", "Cleverness", "Ready", "Prepared", "Equipped", "Educated", "Enhanced", "Disciplined", "Active", "Dynamic", "Powerful", "Tough", "Creative", "Dependable", "Indispensable", "Obliging", "Kindness", "Easy-going", "Consistent", "Strong", "Evolving", "Progressive", "Budding", "Untroubled", "Convenient", "Proper", "Fitting", "Suitable", "Awesome", "Adequate", "Accountable", "Approving", "Certain", "Discerning", "Dutiful", "Emancipated", "Exceptional", "Tactful", "Teachable", "Temperate", "Steadfast", "Observant", "Qualified", "Methodical", "Prudent", "Punctual", "Settled", "Upheld", "Versatile", "Truthful", "Satisfaction", "Contentment", "Relaxed", "Honored", "Pride", "Relief", "Serenity", "Peaceful", "Serene", "Gratification", "Gratefulness", "Thankful", "Appreciative", "Fulfilment", "Accomplishment", "Contemplative", "Realization", "Respite", "Rest", "Reprieve", "Breakaway", "Escapade", "Protected", "Safe", "Assurance", "Confidence", "Secured", "Security", "Sheltered", "Privileged", "Entitled", "Freedom", "Liberating", "Independence", "Unity", "Sentimentality", "Enjoyment", "Triumph", "Nostalgic", "Modesty", "Insightful", "Perceptive", "Pensiveness", "Concentrated", "Zen", "Meditative", "Carefree", "Forgiveness", "Wanderlust", "well-mannered", "Goodwill", "Wishful", "Worthiness", "Sensibility", "Awareness", "Receptivity", "Tranquil", "Revelation", "Accepting", "Dignified", "Introspective", "Authentic", "Loved", "Tolerant", "Fairness", "Well-meaning", "Visionary", "Acceptance", "Authenticity", "Prosperous", "Rewarding", "Revitalized", "Regenerated", "Healed", "Understood", "Mindful", "Present", "Attuned", "Adaptable", "Lucky", "Blessedness", "Genuine", "Restraint", "Fortitude", "Comfortable", "Grounded", "Settled", "Fortunate", "Favored", "Stable", "Self-reliant", "Cool", "Still", "Composed", "Collected", "Unperturbed", "Centered", "Wanted", "Needed", "Important", "Unhurried", "Valued", "Wealthy", "Teeming", "Sufficient", "Well-endowed", "Remembered", "Rooted", "Redeemed", "Purified"]
let negativeWords = ["Afraid", "Agitated", "Aggravated", "Aggressive", "Alarmed", "Alone", "Angry", "Annoyed", "Antagonistic", "Anxious", "Apathetic", "Arrogant", "Ashamed", "Baffled", "Belligerent", "Bested", "Bewildered", "Bitter", "Blocked", "Bored", "Boxed In", "Broken Down", "Bullied", "Burdened", "Chaotic", "Clobbered", "Closed", "Competitive", "Complacent", "Complaining", "Conflicted", "Confused", "Constrained", "Contempt", "Controlled", "Critical", "Cruel", "Crushed", "Curbed", "Cursed", "Defeated", "Defensive", "Dejected", "Deluded", "Demanding", "Demolished", "Dependent", "Depressed", "Derailed", "Desperate", "Destructive", "Detached", "Devastated", "Disappointed", "Disconnected", "Discouraged", "Disgust", "Disgraced", "Disheveled", "Disillusioned", "Disinterested", "Dismayed", "Disoriented", "Distracted", "Divided", "Down", "Downtrodden", "Dumfounded", "Egocentric", "Egotistical", "Empty", "Envious", "Enraged", "Erratic", "Exhausted", "Exacerbated", "Fake", "Fearful", "Foggy", "Fretful", "Frozen", "Frustrated", "Fuming", "Furious", "Hateful", "Heartbroken", "Hindered", "Hopeless", "Huffy", "Hurt", "Greedy", "Guarded", "Idle", "Ignored", "Impatient", "Impulsive", "Incapable", "Indifferent", "Indignant", "Inferior", "Inflamed", "Inhibited", "Insecure", "Insensitive", "Insignificant", "Inundated", "Irate", "Irked", "Irresponsible", "Irritated", "Isolated", "Jealous", "Judged", "Lazy", "Left Out", "Lost", "Manipulated", "Miffed", "Miserable", "Misplaced", "Misunderstood", "Mixed Up", "Moody", "Negative", "Neglected", "Offended", "Oppressed", "Outraged", "Overwhelmed", "Overcome", "Panicked", "Paranoid", "Passive", "Preoccupied", "Pretentious", "Procrastination", "Punished", "Rage", "Reactionary", "Regretful", "Repulsed", "Rejected", "Resentful", "Resigned", "Reticent", "Ridiculous", "Sad", "Sadistic", "Sarcastic", "Secretive", "Seething", "Self Sabotaging", "Shame", "Shamed", "Shocked", "Shut down", "Shy", "Skeptical", "Sorry", "Speechless", "Stagnant", "Stricken", "Stressed", "Stubborn", "Stuck", "Stumped", "Sulky", "Sullen", "Suppressed", "Tense", "Touchy", "Thwarted", "Trapped", "Trepidatious", "Troubled", "Trounced", "Unbalanced", "Unconcerned", "Undone", "Uneasy", "Unhappy", "Unresponsive", "Uptight", "Upset", "Useless", "Vain", "Victimized", "Weak", "Withdrawn", "Worried", "Wrathful"]
const neutralWords = ["Normal", "Standard", "Average", "Balanced", "Common", "Typical", "Indifferent", "Neutral", "Unbiased", "Unemotional", "Unaffected", "Objective", "Impartial", "Ordinary", "Unremarkable", "Uninspiring", "Unimpressive", "Bland", "Mundane", "Mediocre", "Unpretentious"
]

function countWords(postText) {
  let lenPostText = postText.length
  let isWord = false, words = 0
  for (let i = 0; i < lenPostText; ++i) {
    if ((postText[i] >= 'A' && postText[i] <= 'Z') || (postText[i] >= 'a' && postText[i] <= 'z')) {
      isWord = true
    } else if (isWord) {
      isWord = false
      ++words
    }
  }
  if (isWord) {
    ++words
  }
  return words
}
 
async function sentimentAnalysis(href) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(href)
  await page.$$("div > div > div > div > div > div > div > div");
  let postContent = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div > div > div > div > div > div > div "), (e) => ({
      text: e.innerText,

    })))
  let postText = postContent[0].text + " " + postContent[1].text + " " + postContent[2].text
  let words = countWords(postContent[2].text)
  let countPositive = 0, countNegative = 0, countNeutral = 0
  let lenPositiveWords = positiveWords.length, lenNegativeWords = negativeWords.length, lenNeutralWords = neutralWords.length
  for (let i = 0; i < lenNegativeWords; ++i) {
    let regex = new RegExp(`not\\s+${negativeWords[i]}}`, 'gi');
    let secRegex = new RegExp(`${negativeWords[i]}`, 'gi')
    postText = postText.replaceAll(regex, "")
    postText = postText.replaceAll(secRegex, () => {
      console.log(negativeWords[i])
      ++countNegative
      return ""
    })
  }
  for (let i = 0; i < lenPositiveWords; ++i) {
    let regex = new RegExp(`not\\s+${positiveWords[i]}}`, 'gi');
    let secRegex = new RegExp(`${positiveWords[i]}`, 'gi')
    postText = postText.replaceAll(regex, "")
    postText = postText.replaceAll(secRegex, () => {
      ++countPositive
      return ""
    })

  }
  for (let i = 0; i < lenNeutralWords; ++i) {
    let regex = new RegExp(`not\\s+${neutralWords[i]}}`, 'gi');
    let secRegex = new RegExp(`${neutralWords[i]}`, 'gi')
    postText = postText.replaceAll(regex, "")
    postText = postText.replaceAll(secRegex, () => {
      ++countNeutral
      return ""
    })
  }
  if (countNegative == countPositive || countNeutral > countPositive && countNeutral > countNegative) {
    return ["neutral", words]
  }
  if (countPositive > countNegative) {
    return ["positive", words]
  }
  return ["negative", words]
}
app.post('/api-scrape', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = req.body.url
  await page.goto(url)
  await page.$$("div > div > div > div > div > div > div > a");
  const postsImg = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#__next > main > div > div > div > div > a > img"), (e) => ({
      img: e.src,
    }))
  )
  const postsHref = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#__next > main > div > div > div > div > div > div > div > a"), (e) => ({
      href: e.href,
    }))
  )
  const titleAndShortDescription = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div > main > div > div > div > div > div > div > div"), (e) => ({
      text: e.innerText,
    }))
  )

  let jsonResponse = []
  for (let i = 0; i < 5; ++i) {
    let wordsCountAndSentiment = await sentimentAnalysis(postsHref[i].href)
    jsonResponse[i] = {
      title: titleAndShortDescription[i * 4 + 1].text,
      short_description: titleAndShortDescription[i * 4 + 2].text,
      img: postsImg[i].img,
      href: postsHref[i].href,
      sentiment: wordsCountAndSentiment[0],
      words: wordsCountAndSentiment[1],
    }
  }
  res.json(jsonResponse)
  await browser.close()

});

frontEndApp.set("views", path.join(__dirname, "views"))
frontEndApp.set("view engine", "pug")
frontEndApp.use(express.static('public'))
frontEndApp.get('/', (req, res) => {
  res.render("index")
})



