import fs from 'node:fs/promises';
import path from 'node:path';
import { dirname } from 'node:path'; 
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';



const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = `${__dirname}/db/contacts.json`;
// console.log(contactsPath);


// TODO: documentare fiecare funcție



export async function listContacts() {
    try {
        const contents = await readFile(contactsPath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);
        console.table(contacts);
    } catch (error) {
        console.log("There is an error");
        console.error(error);
    }
};



export async function getContactById(contactId) {
    try {
        const contents = await readFile(contactsPath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);

        const result = contacts.find((contact) => contact.id === String(contactId));

        if (result) {
            console.table(result);
        } else {
            console.log(`Contact with ID ${contactId} not found.`);
        }
    } catch (error) {
        console.log("There is an error");
        console.error(error);
    }
}




export async function removeContact(contactId) {
    try {
        const contents = await readFile(contactsPath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);

        // Verificăm dacă ID-ul există
        const contactExists = contacts.some((contact) => contact.id === String(contactId));
        if (!contactExists) {
            console.log(`Contact with ID ${contactId} does not exist.`);
            return; 
        }

        // Filtrăm contactele pentru a elimina contactul cu ID-ul respectiv
        const updatedContacts = contacts.filter((contact) => contact.id !== String(contactId));
        await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

        console.log(`The contact with ID ${contactId} has been removed successfully!`);
        console.table(updatedContacts);
    } catch (error) {
        console.log("There is an error");
        console.error(error);
    }
}




export async function addContact(contact) {
  try {
        const contents = await readFile(contactsPath, { encoding: "utf8" });
        const contacts = JSON.parse(contents);
        const newContactId = randomUUID();
      
      const isValid = contact?.name && contact?.email && contact?.phone;
      if (!isValid) {
        throw new Error('The contact does not have all required parametres'); 
      }

      const newContact = {
          id: newContactId,
          ...contact
      };
    //   console.dir(newContact);
      contacts.push(newContact);
      const parsedContact = JSON.stringify(contacts, null, 2);
      await writeFile(contactsPath, parsedContact);


      console.log('The contact has been ceated successfully !');
      console.table(contacts);
      
  
    } catch (error) {
        console.log("There is an error");
        console.error(error);
    }
}