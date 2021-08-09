// JQlite part starts here

// Ajax Call feature starts here

function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id : "+cid;
return new Element(element);
}

function Element(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}// html function ends
this.value=function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}
}

$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)	
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} // get part ends here

if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if (onFailure) onFailure();
}
}
};
let jsonData={};
let sendJSON=false;
if(jsonObject["sendJSON"])
{
sendJSON=jsonObject["sendJSON"];
if((typeof sendJSON)!="boolean") throw "sendJSON property should be of boolean type in call to ajax";
}
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
let queryString="";
jsonData=jsonObject["data"];
queryString="";
let qsName;
let qsValue;
let xx=0;
// we will change the code to traverse the jsonData
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}
}
}
}
// Ajax call feature ends here

// Modal starts here

// modal specific code starts here
$$$.modals={};
class ModalFor
{
constructor(id)
{
$$$.modals.show(id);
}
}

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}
// following is a class
function Modal(cref)
{
var objectAddress=this;
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("modal_mask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement("div");
headerDivision.style.background="silver";
headerDivision.style.right="0";
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
modalDivision.appendChild(headerDivision);

if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
let xpos=sz.indexOf("x");
if(xpos==-1) xpos=indexof("x");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widthxheight";
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}

if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}

if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}

if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}
var contentDivision=document.createElement("div");
//contentDivision.style.border="1px Solid Black";
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";

contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display="block";
contentReference.style.visibility="visible";
modalDivision.appendChild(contentDivision);

var footerDivision=document.createElement("div");
footerDivision.style.background="silver";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="5px";
modalDivision.appendChild(footerDivision);

if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}
var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("close_button");
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}
if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
}
if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var oc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oc;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
}

this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(this.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};

if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalDivision.style.display="none";
modalMaskDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}


// modal specific code ends here

// accordian starts here

$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}

$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Headings and divisions malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Headings and divisions malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Headings and divisions malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}
$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};
}

// Grid part starts here

class Grid
{
constructor(dataTableId,dataTablePaginationId,students,pageSize)
{
$$$.model.grids[$$$.model.grids.length]=this;
this.dataTableId=dataTableId;
this.dataTablePaginationId=dataTablePaginationId;
this.students=students;
this.pageSize=pageSize;
this.pageNumber=1;
this.numberOfPaginationControls=5;
this.update();
this.updatePagination();
this.scrollHeader();
}
setPage(pageNumber)
{
this.pageNumber=pageNumber;
this.update();
this.updatePagination();
return false;
}
scrollHeader()
{
var grid_header_division=document.querySelector('.grid_header_division');
var grid_body_division=document.querySelector('.grid_body_division');
grid_body_division.addEventListener('scroll',function(){
grid_header_division.scrollLeft=grid_body_division.scrollLeft;
});
}
update()
{
var dataTable=document.getElementById(this.dataTableId);
while(dataTable.rows.length>0) dataTable.deleteRow(0);
var tr;
var td;
var startFromIndex=(this.pageNumber-1)*this.pageSize;
var endAtIndex=startFromIndex+this.pageSize-1;
if(endAtIndex>=this.students.length) endAtIndex=this.students.length-1;
var x;
for(x=startFromIndex;x<=endAtIndex;x++)
{
tr=document.createElement("tr");
td=document.createElement("td");
td.innerHTML=(x+1);
tr.appendChild(td);
td=document.createElement("td");
td.innerHTML=this.students[x].rollNumber;
tr.appendChild(td);
td=document.createElement("td");
td.innerHTML=this.students[x].name;
tr.appendChild(td);
td=document.createElement("td");
td.innerHTML=this.students[x].nameOfMother;
tr.appendChild(td);
td=document.createElement("td");
td.innerHTML=this.students[x].nameOfFather;
tr.appendChild(td);
dataTable.appendChild(tr);
}
}
updatePagination()
{
function createPageChangeFunction(obj,pageNumber)
{
return function(){
obj.setPage(pageNumber);
};
}
var startFrom=((Math.floor((this.pageNumber-1)/this.numberOfPaginationControls)+1)-1)*this.numberOfPaginationControls+1;
var endAt=startFrom+this.numberOfPaginationControls-1;
var numberOfPages=Math.floor(this.students.length/this.pageSize);
if(this.students.length%this.pageSize!=0) numberOfPages++;
if(endAt>numberOfPages) endAt=numberOfPages;
var dataTablePagination=document.getElementById(this.dataTablePaginationId);
while(dataTablePagination.rows.length>0) dataTablePagination.deleteRow(0);
var x;
var tr;
var td;
var anchor;
tr=document.createElement("tr");
if(startFrom>1)
{
td=document.createElement("td");
anchor=document.createElement("a");
anchor.text="prev";
anchor.href='javascript:void(0)';
anchor.onclick=createPageChangeFunction(this,startFrom-1);
td.appendChild(anchor);
tr.appendChild(td);
}
for(x=startFrom;x<=endAt;x++)
{
td=document.createElement("td");
if(x==this.pageNumber)
{
td.innerHTML="<b>"+x+"</b>";
}
else
{
anchor=document.createElement("a");
anchor.text=x;
anchor.href='javascript:void(0)';
anchor.onclick=createPageChangeFunction(this,x);
td.appendChild(anchor);
}
tr.appendChild(td);
}
if(endAt<numberOfPages)
{
td=document.createElement("td");
anchor=document.createElement("a");
anchor.text="next";
anchor.href='javascript:void(0)';
anchor.onclick=createPageChangeFunction(this,endAt+1);
td.appendChild(anchor);
tr.appendChild(td);
}
dataTablePagination.appendChild(tr);
}
}

// Grid part ends here


// initFramework starts here

$$$.initFramework=function(){
$$$.model={
"accordians":[],
"modals":[],
"grids":[]
};


// setting up the accordian starts here
let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
// setting up the accordian ends here

// setting up the modal starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
// setting up the modal ends here

// setting up the grid starts here

window.addEventListener('load',function(){
$$$.loader();
});

// setting up the grid ends here
}
// initFramework ends here

window.addEventListener('load',function(){
$$$.initFramework();
});


// JQlite specific part ends here
