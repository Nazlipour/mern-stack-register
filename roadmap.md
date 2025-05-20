


..... kommt später 

- bis jetz haben wir `userModel` erstellt

- Erstellen wir unsere erste `controller`.. 
````js
export const register = async (req, res) =>  {
    /**
     * Was brauchen wir???
     * Name
     * Email
     * Password
     */
    const {name, email, password } = req.body; 
    if(!name|| !email || !password){
        return res.json({success: false, message: "All field are required"})
    }
    return res.send({
        name:name,
        email:email,
        password:password
    })
}
````
- bis jetzt cotroller gibt zurück nur `name`, `email`, `password` nächste ziel ist unsere user in DB speichern..

````js
export const register = async (req, res) =>  {
    /**
     * Was brauchen wir???
     * Name
     * Email
     * Password
     */
    const {name, email, password } = req.body; 
    if(!name|| !email || !password){
        return res.json({success: false, message: "All field are required"})
    }

    try {
        const user = await userModel.create({name, email, password});
        await user.save()
        return res.status(200).json({
            success: true,
            message:"User created!",
            user:{
                name:name,
                email:email
            }
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
// damit können wir basic user info in MongoDB speichern.
````
- Wir haben ein Probleme ‼️ Die Passwörter stehen in Database Offen / lesbar ! und wir wollan das nicht 🤗
- Da können wir package  `bcryptjs` benutzen ⚿. Wir machen "hashing" Password. 
- In modelUser impotieren `bcryptjs` package und benutzen wir so:

````js
// Bevor ein Benutzer-Dokument gespeichert wird, wird diese Funktion automatisch ausgeführt.
userSchema.pre("save", async function (next) {
  
  // Prüft, ob das Passwort-Feld geändert wurde (z. B. beim Anlegen oder Ändern des Passworts)
  if (this.isModified("password")) {
    try {
      // Wenn das Passwort geändert wurde, wird es mit bcrypt gehasht.
      // Der zweite Parameter (10) steht für die Anzahl der sogenannten Salt-Runden (je höher, desto sicherer, aber auch langsamer).
      this.password = await bcrypt.hash(this.password, 10);
    
    } catch (error) {
      // Wenn beim Hashing ein Fehler auftritt, wird dieser an Express weitergegeben.
      return next(error);
    }
  }

  // Wenn alles erfolgreich war (oder das Passwort nicht verändert wurde), geht der Prozess weiter.
  next();
});
````

- Im Register-Controller generieren wir ein Token, das zur Authentifizierung dient, sodass wir uns ohne erneute Eingabe von E-Mail und Passwort anmelden können.

````js
// controller > authController.js > register 
// Erstelle ein JWT-Token mit der Benutzer-ID als Payload, gültig für 1 Jahr
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1y" }) 

// Setze das Token als HTTP-Cookie
res.cookie('token', token, {
    httpOnly: true, // Cookie ist nur für den Server zugänglich, nicht über JavaScript (Schutz vor XSS)
    secure: process.env.NODE_ENV === "production", // Nur über HTTPS in Produktionsumgebung senden
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", 
    // "none": erlaubt Cross-Site-Cookies (z. B. bei getrennten Frontend-/Backend-Domains)
    // "strict": erlaubt Cookies nur bei gleichen Ursprüngen (mehr Sicherheit im Development)

    maxAge: 1000 * 60 * 60 * 24 * 365 // Cookie läuft nach 1 Jahr ab (in Millisekunden)
})
````



