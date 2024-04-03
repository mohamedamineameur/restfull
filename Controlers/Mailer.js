import nodemailer from 'nodemailer'






export const mailer =  (mail, sub, txt)=>{

    
    let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true, // true pour le port 465, false pour d'autres ports
        auth: {
          user: "apikey",
          pass: process.env.API_KEY
        }
      });
      
      let mailOptions = {
        from: '"Mohamed Dev" <mohamed.amine.ameur@mohamed-amine-ameur.com>',
        to: mail,
        subject: sub,
        text: txt,
        html: `<p style="color: blue; font-size: 16px;">${txt}</p>`  // HTML body
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message envoyé: %s", info.messageId);
      });
}

/*


import { Resend } from 'resend';

export const mailer = async (mail, subjects, texte) => {
    
    const resend = new Resend('re_56qQ9B1i_M9K4VQ2DzjerDPgnkbsnYR8e');
    

    try {
     const {data, error}  = await resend.emails.send({
            from: 'bug@resend.dev',
            to: mail,
            subject: subjects,
            html: `<p style="color: blue; font-size: 16px;">${texte}</p>` // Ajout de style en ligne
        });
        console.log(data);
    } catch (erreur) {
        console.log("Ça n'a pas marché : ", erreur);
    }
}










export const test=async()=>{

    const commande=await Commande.findByPk(1)

    let Produits=commande.produits
    Produits = Produits.slice(1, -1)
    let tabProd=Produits.split(',').map(Number);
    let lesProd=[]
    for (const valeur of tabProd){
       const pr=await Produit.findByPk(valeur)
       //console.log("le id du produit est: "+valeur)
        lesProd.push(pr.nom)

    }

    for(const valeur of lesProd){
        console.log(valeur)
    }
}

export const test2=async()=>{

    const panier= await Panier.findByPk(2)
    let lesprod=panier.produits
    lesprod=lesprod.replace(/\\/g, "");
    lesprod=lesprod.replace(/\"/g, "");
    lesprod=lesprod.substring(1, lesprod.length - 1);
    let produifini=lesprod.split(',').map(String)

    for (let i=0;i<produifini.length;i++){
        console.log(produifini[i])
    }
}
*/