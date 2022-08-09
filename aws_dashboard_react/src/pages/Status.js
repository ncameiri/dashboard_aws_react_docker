import axios from "axios";
import { aws4Interceptor } from "aws4-axios";
import XMLParser from 'react-xml-parser';
import React, { useState, useEffect } from 'react';

const Status = () => {
    const client = axios.create();
    const [stat_id1, setStat_id1] = React.useState({});
    const [isLoading, setLoading] = useState(true);

    const [stat_id2, setStat_id2] = React.useState({});
    const [isLoading2, setLoading2] = useState(true);

    const [list_sort, setList_sort] = useState(true);


    const interceptor = aws4Interceptor({
        region: "",
        service: "",
    }, {

        accessKeyId: "{_ACCESS_KEY_ID_}",
        secretAccessKey: "{_SECRET_ACCESS_KEY_}",

    }
    );

    client.interceptors.request.use(interceptor);

    // Requests made using Axios will now be signed
    React.useEffect(() => {
        client.get("https://ec2.eu-west-1.amazonaws.com/?IncludeAllInstances=True&Action=DescribeInstanceStatus&Version=2013-02-01").then(res => {
            var xml = new XMLParser().parseFromString(res.data);
            //todos as instancias
            //console.log("AQUI: ")
            console.log(xml);
            //console.log(xml.getElementsByTagName('instanceId')[0].value);
            //stat1 = xml;
            setStat_id1(xml);
            setLoading(false);
            //setStat_id1(xml);
            //setStat_id2(xml.getElementsByTagName('instanceId')[1].value);
            //setStat_id3(xml.getElementsByTagName('instanceId')[2].value);
            //console.log(xml.getElementsByTagName('instanceid')[0].children[1].value);
            //console.log(xml.getElementsByTagName('instanceState')[0].children[1].value);
            //setStat1(xml.getElementsByTagName('instanceState')[0].children[1].value);
            //setStat2(xml.getElementsByTagName('instanceState')[1].children[1].value);
            //setStat3(xml.getElementsByTagName('instanceState')[2].children[1].value);
            //console.log(xml.children[1].children);
            //console.log(xml.children[1].children[0]);
            //console.log(stat_id1.children[1].children[0].children[2].children[1].value);
            //console.log(stat_id1.children[1].children[0].children[2].children[2].children[1].value);
        })
    }, []);


    React.useEffect(() => {
        client.get("https://ec2.eu-west-1.amazonaws.com/?Filter.1.Name=resource-type&Filter.1.Value=instance&Action=DescribeTags&Version=2013-02-01").then(res => {
            var xml = new XMLParser().parseFromString(res.data);
            console.log(xml);
            setStat_id2(xml);
            setLoading2(false);

        })
    }, []);

    React.useEffect(() => {
        if (!isLoading && !isLoading2) {
            //valor nome stat_id2.children[1].children[0].children[3].value
            //valor id stat_id2.children[1].children[VAR].children[0].value
            //da lista 1
            // escrever o nome para  stat_id1.children[1].children[0].children[2].value
            //<li> {stat_id1.children[1].children[VAR].children[0].value} {stat_id1.children[1].children[VAR].children[2].children[1].value}</li>
            stat_id1.children[1].children[0].children[2].value = stat_id2.children[1].children[0].children[0].value;
            console.log(stat_id2.children[1].children[0].children[3].value);
            console.log(stat_id2.children[1].children[1].children[3].value);
            console.log(stat_id2.children[1].children[2].children[3].value);
            //stat_id1.children[1].children[i].children[0].value
            for (var i = 0; i < {_INST_NUM_}; i++) {
                //stat_id2.children[1].children[k].children[0].value
                for (var k = 0; k < {_INST_NUM_}; k++) {
                    if (stat_id2.children[1].children[k].children[0].value == stat_id1.children[1].children[i].children[0].value)
                        stat_id1.children[1].children[i].children[2].value = stat_id2.children[1].children[k].children[3].value
                }
            }
            setList_sort(false);
        }
    });

    /*function Loop() {
        for (var j = 0; j < 3; j++) {
            <li> {stat_id1.children[1].children[j].children[2].value}  {stat_id1.children[1].children[j].children[0].value} {stat_id1.children[1].children[j].children[2].children[1].value}</li>
        }
    }*/
    if (isLoading || isLoading2 || list_sort)
        return <div>Loading</div>

    const runCallback = (cb) => {
        return cb();
    };
    return (<div>
        {
            runCallback(() => {
                const row = [];
                for (var j = 0; j < {_INST_NUM_}; j++) {
                    if (stat_id1.children[1].children[j].children[2].children[1].value == 'stopped')
                        row.push(<li style={{ fontSize: 35 }}> <span style={{ color: "red" }}>{'\u2B24'}</span>{stat_id1.children[1].children[j].children[2].value}  {stat_id1.children[1].children[j].children[0].value} {stat_id1.children[1].children[j].children[2].children[1].value}
                        </li>);
                    else {
                        row.push(<li style={{ fontSize: 35 }}><span style={{ color: "green" }}>{'\u2B24'}</span> {stat_id1.children[1].children[j].children[2].value}  {stat_id1.children[1].children[j].children[0].value} {stat_id1.children[1].children[j].children[2].children[1].value}
                        </li>);
                    }
                }
                return row;
            })
        }

    </div>);
};
export default Status;