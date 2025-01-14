import { addContact, getContactById, listContacts, removeContact } from "./contacts.js";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';


const argv = yargs(hideBin(process.argv)).argv;
const action = argv.action;

if (action === "add") {
    const hasAllArguments = argv.name && argv.email && argv.phone;

    if (!hasAllArguments) {
        console.log('For adding this contact we need "name", "email", "phone".')
    }
}
// console.log(action);

// TODO: refactorizare
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
        getContactById(id);
          
      break;

    case "add":
        const hasAllArguments = argv.name && argv.email && argv.phone;

        if (!hasAllArguments) {
            console.log('For adding this contact we need "name", "email", "phone".')
          };
        
        const contact = {
            name: argv.name,
            email: argv.email,
            phone: argv.phone
        };
          
          addContact(contact);
        break;

    case "remove":
      removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!"); 
  }
}

invokeAction(argv);

/*
# Obținerea și afișarea întregii liste de contacte sub formă de tabel (console.table)
node index.js --action list

# Obținerea unui contact după id
node index.js --action get --id 5

# Adăugarea unui contact
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

# Ștergerea unui contact
node index.js --action remove --id=3
*/
