require("dotenv").config() //  loads environment variables from a .env file into Node.js process.env object

function envChecker() {
    /**
    * process is a global, and process.argv is an array. 
    * We are assigning process.argv to an array called arr.
    * 
    * In JavaScript, arrays are objects.
    */

    const arr = process.argv; 

    /**
     * By default, process.argv contains two elements:
     * 
     * process.argv[0]: The file system path to the Node.js executable that is running the process.
     * process.argv[1]: The file system path to the JavaScript entry file that is currently being executed.
     * 
     * Starting from process.argv[2], the array contains the actual arguments passed from the CLI when executing 
     * the JavaScript file.
     */

    const lengthOfArray = arr.length;
    let processEnvObj = process.env; // process.env is an object

    // If the length of process.argv is <= 2, then no arguments have been passed from the CLI. 
    // Hence, we print a friendly message and exit the program.

    if(lengthOfArray <= 2) {
        console.log(`error: please provide at least one environment variable name`);
        process.exit(2);
    }

    let result = true;

    const missingEnvVariables = [];

    for(let i = 2 ; i < lengthOfArray ; i++) {

        let envVariable = arr[i];

        let temp = envVariable;

        /**
         * We are checking whether the CLI arguments that are being passed are set to a value or not.
         *
         * If an environment variable is set to a value, it will be truthy.
         * In that case, we print that the corresponding environment variable is set.
         * Otherwise, we store the missing environment variable in the missingEnvVariables array.
        */

        if(envVariable == "PATH") {
            envVariable = "DIRECTORY_PATH"; // overriding , PATH variable in process.env
        }
        
        if(processEnvObj[envVariable]) {
            console.log(`${envVariable} is SET`);
        } else {
            missingEnvVariables.push(temp);

            result = false; // Flag variable to check whether any environment variables are not initialized.
        }
    }

    if(result) {
        console.log(`All required environment variables are set.`)
    } else {
        console.log(`error: missing environment variables: ` , missingEnvVariables);
    }
}

envChecker();