import React, {useEffect, useState} from "react"
import MaterialTable from "material-table";
import {misCentres, misDelete} from "./Utils";

const columns = [
    {
        title: "ID",
        field: "id",
    },
    {
        title: "Zone",
        field: "zone",
    },
    {
        title: "State",
        field: "state",
    },
    {
        title: "City",
        field: "city",
    },
    {
        title: "Code",
        field: "code",
    },
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Centre type",
        field: "centre_type",
    }
];


const CenterTable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        misCentres().then( (res) => {
                 setData(res);
            });
    }, [])


    return (
        <MaterialTable
            title="Employee Details"
            data={data}
            columns={columns}
            options={{ search: true, filtering: true }}
            editable={{
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        misDelete(oldData.id)
                            .then((res)=>{
                                misCentres().then( (res) => {
                                    setData(res);
                                    resolve();
                                }).catch( (err) => {
                                    reject()
                                })
                            }).catch( (err) => {
                                reject()
                            })
                        setTimeout(() => {
                            console.log(oldData.id)
                            resolve();
                        }, 1000);
                    }),
            }}
        />
    )
}

export default CenterTable