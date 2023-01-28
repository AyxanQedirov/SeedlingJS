$(document).ready(() => {
    let datas= [
        { id: '1', value: 'a', parentid: '#' },
        { id: '2', value: 'b', parentid: '5' },
        { id: '3', value: 'c', parentid: '2' },
        { id: '4', value: 'taytenik', parentid: '#' },
        { id: '5', value: 'e', parentid: '4' },
        { id: '6', value: 'test1', parentid: '1' },
        { id: '7', value: 'yes', parentid: '1' },
        { id: '8', value: 'no', parentid: '1' },
        { id: '9', value: 'ikoNam', parentid: '1' },
        { id: '10', value: 'ikoNam2', parentid: '4' },
        { id: '11', value: 'teletapi', parentid: '9' }
    ];

    let options={
        FileClickEvent:(eventTarget)=>{
            console.log(eventTarget.text());
        },
        FileHoverEvent:()=>{
            console.log("usutune geldim men");
        }
    }

    createTree('.tree-view-side',datas,options);
})