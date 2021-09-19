import XLSX from "xlsx"

export function readXLSx(fileUpload){
        let data=[{
            "name":"jayanth",
            "data":"scd",
            "abc":"sdef"
        }]
        let jsonObj

        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(fileUpload);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            jsonObj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(jsonObj); 
            }, 2000);

            setTimeout(() => {
                if (jsonObj == undefined){
                const errorObject = {
                    msg: 'An error occured',
                }
                reject(errorObject);
                }
            }, 2000);
        });
    }   
