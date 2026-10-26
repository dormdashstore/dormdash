/* Dorm Dash shared script: product data, cart and page behavior */
const HALLS=[["Bell Hall",28],["Foundation Hall",34],["Parkhurst Hall",31],["Napier Hall",36],["Adams Hall",33],["Sanford Hall",30],["Wells Hall",38],["Other / Off Campus",55]];
const OTHER=HALLS.length-1;
const isOther=()=>hall===OTHER;
const placeName=()=>isOther()?"your address":HALLS[hall][0];
const FREE_AT=35, STD_FEE=3.99, DASH_FEE=5.99;
const ICONS={
 bedding:'<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M3 18v2M21 18v2M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10"/>',
 bath:'<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
 desk:'<path d="M5 21h9M9.5 21v-5.5M9.5 15.5l5-6M14.5 9.5 11 6.5l3.5-3.5 4 3.5zM18.5 6.5l1.5 3"/>',
 storage:'<path d="M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4 9-4M12 12v9"/>',
 kitchen:'<path d="M4 8h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM16 10h1.5a2 2 0 0 1 0 4H16M8 3v2.5M12 3v2.5"/>',
 tech:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
 clean:'<path d="M9 9h6v11a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM10 9V6h4l3-2.5M14 6h3.5M10 14h4"/>',
 kits:'<path d="M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8c-1.5-4-6-3.5-5 0M12 8c1.5-4 6-3.5 5 0"/>'
};
const CATS=[["kits","Kits"],["bedding","Bedding"],["bath","Bath"],["desk","Desk & Office"],["storage","Storage"],["kitchen","Kitchenette"],["tech","Tech"],["clean","Laundry & Cleaning"]];
const P=[
 {id:"k1",cat:"kits",name:"Move-In Kit, 14 pieces",price:119,reg:150,spec:"14 items",r:4.8,n:612,d:"Mellanni Twin XL sheet set, 2 bath + 2 hand towels, mesh shower caddy, shower slides, 20 velvet hangers, Belkin 6-outlet surge protector, Command hooks (16 ct), pop-up hamper, Tide PODS (42 ct), Clorox wipes (75 ct), Expo dry-erase door board"},
 {id:"k2",cat:"kits",name:"Finals Week Kit, 9 pieces",price:34,spec:"9 items",r:4.6,n:203,d:"Sharpie highlighters (4-pk), Five Star notebook, Oxford index cards (300 ct), Post-it flags (4 colors), Pilot G2 pens (4-pk), Mack's foam earplugs (10 pr), 3 Clif Bars"},
 {id:"k3",cat:"kits",name:"Sick Day Kit, 7 pieces",price:28,spec:"7 items",r:4.7,n:148,d:"Kleenex tissues (3-pk), Halls cough drops (30 ct), Liquid I.V. hydration sticks (6 ct), 2 Campbell's Chicken Noodle Soup on the Go cups, Vicks digital thermometer, Chapstick"},
 {id:"b1",cat:"bedding",name:"Mellanni Twin XL Microfiber Sheet Set, 4 pc",price:24.99,reg:29.99,spec:"39 × 80 in",r:4.5,n:1840,d:"Fitted sheet, flat sheet and 2 pillowcases. 16 in deep pockets fit a topper."},
 {id:"b2",cat:"bedding",name:"Linenspa 3\" Gel Memory Foam Mattress Topper, Twin XL",price:54.99,spec:"Twin XL · 3 in",r:4.7,n:2291,d:"Gel-infused foam sleeps cooler on a vinyl dorm mattress."},
 {id:"b3",cat:"bedding",name:"8\" Bed Risers with 2 USB + 2 Outlets, Set of 4",price:19.99,spec:"8 in lift",r:4.4,n:977,d:"Holds up to 1,300 lb. Adds room for under-bed storage."},
 {id:"h1",cat:"bath",name:"Mesh Shower Caddy Tote, 9 Pockets",price:11.99,reg:14.99,spec:"9 pockets",r:4.6,n:1533,d:"Quick-drying mesh with two handles for shared bathrooms."},
 {id:"h2",cat:"bath",name:"adidas Adilette Shower Slides",price:24.99,spec:"Men's 5–13",r:4.6,n:688,d:"Quick-drying, non-slip slides for communal showers."},
 {id:"h3",cat:"bath",name:"Cotton Towel Set, 4 pc (2 Bath, 2 Hand)",price:24.99,spec:"600 GSM",r:4.5,n:812,d:"Bath towels 27 × 54 in, hand towels 16 × 28 in. Navy or grey."},
 {id:"d1",cat:"desk",name:"LED Clamp Desk Lamp, 3 Color Modes, 10 Brightness Levels",price:22.99,reg:27.99,spec:"Clamps up to 2.4 in",ra:1,r:4.6,n:1402,d:"Clamps to a bed frame or desk edge. Stays cool, no halogen."},
 {id:"d2",cat:"desk",name:"Expo Dry-Erase Door Board with 2 Expo Markers",price:12.99,spec:"11 × 14 in",r:4.2,n:356,d:"Mounts with removable strips. Includes black and blue markers."},
 {id:"d3",cat:"desk",name:"Five Star 1-Subject Notebooks, College Ruled, 5-Pack",price:8.99,spec:"100 sheets each",r:4.7,n:2610,d:"8.5 × 11 in, perforated pages, assorted colors."},
 {id:"d4",cat:"desk",name:"Sharpie Pocket Highlighters, Chisel Tip, 4-Pack",price:5.49,spec:"Yellow, pink, blue, green",r:4.8,n:5120,d:"Smear-guard ink won't smudge most pen and printer ink."},
 {id:"d5",cat:"desk",name:"Pilot G2 Gel Pens, 0.7 mm, Black, 4-Pack",price:7.99,spec:"Retractable",r:4.8,n:3890,d:"Smooth-writing gel ink with a rubber grip."},
 {id:"d6",cat:"desk",name:"Oxford Ruled Index Cards, 3 × 5 in, 300 Count",price:6.49,spec:"3 × 5 in",r:4.7,n:1204,d:"White ruled cards for flashcards and notes."},
 {id:"d7",cat:"desk",name:"Mesh 6-Compartment Desk Organizer",price:16.99,spec:"Phone slot",r:4.4,n:421,d:"Holds pens, a phone, sticky notes and a charger."},
 {id:"s1",cat:"storage",name:"Sterilite 56 Qt Wheeled Under-Bed Boxes, 2-Pack",price:21.99,reg:26.99,spec:"6.3 in tall",r:4.5,n:903,d:"Clear lids, latching handles and wheels. Fits under raised dorm beds."},
 {id:"s2",cat:"storage",name:"6-Hook Over-the-Door Rack, Chrome",price:9.99,spec:"No tools",r:4.4,n:1177,d:"Fits doors up to 1.75 in thick. Holds towels, coats and bags."},
 {id:"s3",cat:"storage",name:"Command Medium Utility Hooks, 16 Hooks + 24 Strips",price:11.99,spec:"Holds 3 lb each",ra:1,r:4.6,n:3044,d:"Removes cleanly from painted walls, so you keep your deposit."},
 {id:"s4",cat:"storage",name:"Velvet Non-Slip Hangers, 20-Pack",price:14.99,spec:"Slim profile",r:4.7,n:2210,d:"Saves closet space in narrow dorm wardrobes."},
 {id:"c1",cat:"kitchen",name:"Frigidaire 3.1 Cu Ft Compact Fridge with Freezer",price:149.99,reg:179.99,spec:"3.1 cu ft",r:4.5,n:1288,d:"Reversible door, adjustable thermostat. Carried to your room."},
 {id:"c2",cat:"kitchen",name:"Hamilton Beach 1L Electric Kettle, Auto Shut-Off",price:24.99,spec:"1 L",ra:1,r:4.7,n:742,d:"Boils water for tea, ramen and oatmeal. Shuts off when done."},
 {id:"c3",cat:"kitchen",name:"Rubbermaid TakeAlongs 3.2-Cup Bowls with Lids, 4 ct",price:9.99,spec:"Microwave-safe",r:4.3,n:291,d:"BPA-free. Stack inside each other to save space."},
 {id:"t1",cat:"tech",name:"Belkin 6-Outlet Surge Protector with 2 USB, 6 ft Cord",price:16.99,reg:19.99,spec:"UL-listed · 900 J",ra:1,r:4.8,n:2187,d:"Most halls ban plain extension cords. This one passes."},
 {id:"t2",cat:"tech",name:"Clip-On 6\" USB Desk Fan, 2 Speeds",price:21.99,spec:"Bunk-rail clip",r:4.4,n:640,d:"Clips to a bed rail or shelf. Runs off any USB port."},
 {id:"t3",cat:"tech",name:"Anker 10 ft USB-C to USB-C Braided Cable",price:11.99,spec:"60 W",r:4.5,n:1530,d:"Reaches from the outlet to a lofted bed."},
 {id:"l1",cat:"clean",name:"Pop-Up Mesh Laundry Hamper with Handles, 60 L",price:17.99,spec:"Folds flat",r:4.5,n:833,d:"Carry it to the laundry room, fold it flat when empty."},
 {id:"l2",cat:"clean",name:"Tide PODS Original Laundry Detergent, 42 ct",price:13.99,spec:"HE compatible",r:4.7,n:4120,d:"Works in the high-efficiency washers most halls use."},
 {id:"l3",cat:"clean",name:"Clorox Disinfecting Wipes, 3-Pack (225 Wipes)",price:8.49,reg:9.99,spec:"Fresh scent",r:4.8,n:2895,d:"For desks, door handles and the shared microwave."}
];
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
["k2","k3","d5","d6","s4","c3"].forEach(id=>byId[id].nw=1);

/* product art */
const O="#2B2D2A";
const rep=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
const ART={
 k1:`<rect x="30" y="20" width="18" height="38" rx="7" fill="#2F4A6D"/><path d="M58 28 L42 42 H74 Z" fill="none" stroke="#7C8288" stroke-width="3"/><rect x="72" y="24" width="22" height="34" rx="3" fill="#8FB3D9"/><rect x="52" y="36" width="11" height="22" rx="3" fill="#F5D36B"/>
   <path d="M20 56 H100 V100 H20 Z" fill="#D7B285"/><path d="M20 56 L8 44 H42 L54 56 Z" fill="#E6C79E"/><path d="M100 56 L112 44 H78 L66 56 Z" fill="#E6C79E"/>
   <rect x="40" y="70" width="40" height="16" rx="2" fill="#FFFFFF"/><text x="60" y="81" text-anchor="middle" font-size="8" font-weight="800" font-family="Helvetica,Arial,sans-serif" fill="#18794E" stroke="none">MOVE-IN</text>`,
 k2:`<rect x="18" y="28" width="52" height="70" rx="3" fill="#4A90D9"/>${rep(8,i=>`<circle cx="23" cy="${34+i*8.5}" r="2.2" fill="#FFFFFF"/>`)}<rect x="32" y="40" width="30" height="10" rx="1" fill="#FFFFFF"/>
   <g transform="rotate(12 84 52)"><rect x="62" y="34" width="44" height="30" fill="#FFFFFF"/><path d="M62 41h44" stroke="#E05A4A" stroke-width="1.5"/>${rep(3,i=>`<path d="M66 ${48+i*5}h36" stroke="#8FB3D9" stroke-width="1"/>`)}</g>
   <g transform="rotate(-28 80 90)"><rect x="54" y="84" width="40" height="10" rx="3" fill="#F7E04B"/><rect x="92" y="84" width="12" height="10" rx="3" fill="#D9C232"/></g>
   <g transform="rotate(-28 84 100)"><rect x="60" y="96" width="40" height="10" rx="3" fill="#F48FB1"/><rect x="98" y="96" width="12" height="10" rx="3" fill="#D86A92"/></g>`,
 k3:`<rect x="16" y="56" width="52" height="40" rx="3" fill="#A8D5C2"/><path d="M16 70 q26 10 52 0" fill="none" stroke="#FFFFFF" stroke-width="2"/><ellipse cx="42" cy="56" rx="12" ry="3" fill="${O}"/><path d="M35 56 q2 -18 8 -16 q8 2 4 16 z" fill="#FFFFFF"/>
   <path d="M72 54 L76 96 H98 L102 54 Z" fill="#E05A4A"/><rect x="70" y="48" width="34" height="8" rx="3" fill="#FFFFFF"/><rect x="74" y="68" width="26" height="12" fill="#FFFFFF"/>
   <g transform="rotate(-14 56 104)"><rect x="26" y="100" width="58" height="8" rx="4" fill="#FFFFFF"/><rect x="26" y="100" width="13" height="8" rx="4" fill="#4A90D9"/><rect x="62" y="101.5" width="14" height="5" fill="#BFE3D1" stroke="none"/></g>`,
 b1:`<rect x="20" y="74" width="80" height="24" rx="5" fill="#7FA6D1"/><path d="M26 86h68" stroke="#A9C6E6" stroke-width="1.5"/><rect x="24" y="52" width="72" height="24" rx="5" fill="#A9C6E6"/><path d="M30 64h60" stroke="#C9DBEF" stroke-width="1.5"/><rect x="30" y="28" width="60" height="26" rx="9" fill="#FFFFFF"/><path d="M40 41h40" stroke="#C9D6E6" stroke-width="1.5"/>`,
 b2:`<path d="M12 68 L60 50 L108 68 L60 86 Z" fill="#F4F6FB"/><path d="M12 68 v14 L60 100 v-14 Z" fill="#DFE5F0"/><path d="M108 68 v14 L60 100 v-14 Z" fill="#C6D0E3"/>
   ${[[44,64],[60,58],[76,64],[60,70],[48,72],[72,72],[60,78],[36,68],[84,68]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#7FB6E8" stroke="none"/>`).join("")}`,
 b3:`<path d="M14 96 L26 52 h26 l12 44 Z" fill="#3A3D39"/><rect x="24" y="44" width="30" height="9" rx="2" fill="#5A5F58"/><path d="M56 98 L68 58 h26 l12 40 Z" fill="${O}"/><rect x="66" y="50" width="30" height="9" rx="2" fill="#4A4E48"/>
   <rect x="74" y="72" width="14" height="4" rx="1" fill="#8FD3FF" stroke="none"/><rect x="74" y="80" width="14" height="4" rx="1" fill="#8FD3FF" stroke="none"/><rect x="77" y="88" width="3" height="5" fill="#FFFFFF" stroke="none"/><rect x="82" y="88" width="3" height="5" fill="#FFFFFF" stroke="none"/>`,
 h1:`<rect x="30" y="22" width="14" height="34" rx="4" fill="#6FB7A8"/><rect x="33" y="15" width="8" height="8" fill="${O}"/><rect x="48" y="30" width="18" height="26" rx="7" fill="#F2B8C6"/><rect x="70" y="18" width="13" height="38" rx="4" fill="#F5D36B"/><rect x="72" y="12" width="9" height="7" fill="#FFFFFF"/><rect x="86" y="34" width="8" height="22" rx="2" fill="#FFFFFF"/>
   <path d="M28 52 C28 24 92 24 92 52" fill="none" stroke-width="4"/>
   <rect x="20" y="50" width="80" height="48" rx="8" fill="#8A8F88"/>${rep(7,i=>`<path d="M${30+i*10} 51v46" stroke="#A9AEA7" stroke-width="1"/>`)}${rep(4,i=>`<path d="M21 ${60+i*10}h78" stroke="#A9AEA7" stroke-width="1"/>`)}<rect x="20" y="50" width="80" height="48" rx="8" fill="none"/>`,
 h2:`${[0,48].map(dx=>`<g transform="translate(${dx} ${dx?6:0})"><path d="M36 14 C20 14 18 38 20 60 C22 86 24 104 38 104 C52 104 54 86 54 60 C56 38 52 14 36 14Z" fill="#3A3D39"/><path d="M36 20 C24 20 23 38 24 58 C26 82 28 98 38 98 C48 98 50 82 50 58 C52 38 48 20 36 20Z" fill="#555A54" stroke="none"/><path d="M17 40 h40 v22 h-39 Z" fill="#18794E"/></g>`).join("")}`,
 h3:`<rect x="18" y="80" width="84" height="18" rx="7" fill="#2F4A6D"/><path d="M26 89h68" stroke="#4A678C" stroke-width="1.5"/><rect x="22" y="62" width="76" height="18" rx="7" fill="#9AA1A8"/><path d="M30 71h60" stroke="#B5BBC1" stroke-width="1.5"/><rect x="28" y="46" width="64" height="16" rx="6" fill="#2F4A6D"/><path d="M34 54h52" stroke="#4A678C" stroke-width="1.5"/><rect x="32" y="30" width="56" height="16" rx="6" fill="#C3C8CD"/><path d="M38 38h44" stroke="#D9DDE1" stroke-width="1.5"/>`,
 d1:`<path d="M84 50 L110 100 H56 Z" fill="#FFF3B0" stroke="none" opacity=".9"/><rect x="6" y="96" width="108" height="8" fill="#C9A77C"/><path d="M16 90 h22 v14 h-6 v8 h-10 v-8 h-6 Z" fill="#3A3D39"/>
   <path d="M27 90 L42 50 L74 34" fill="none" stroke="${O}" stroke-width="6"/><circle cx="42" cy="50" r="5" fill="#18794E"/><circle cx="74" cy="34" r="4" fill="#18794E"/><path d="M68 28 L96 40 L88 56 L64 42 Z" fill="${O}"/><path d="M90 46 L84 54" stroke="#FFF3B0" stroke-width="3"/>`,
 d2:`<rect x="24" y="12" width="72" height="92" rx="4" fill="#C3C7CC"/><rect x="29" y="17" width="62" height="82" rx="2" fill="#FFFFFF"/><path d="M36 30h40M36 40h46M36 50h30" stroke="#2F6FD0" stroke-width="2.5"/><path d="M38 68 q8 -10 16 0 t16 0" stroke="${O}" fill="none"/><path d="M38 82h24" stroke="#E05A4A" stroke-width="2.5"/>
   <g transform="rotate(-28 90 96)"><rect x="68" y="92" width="38" height="9" rx="3" fill="${O}"/><rect x="104" y="92" width="9" height="9" rx="2" fill="#F2F2F2"/></g><g transform="rotate(-28 96 106)"><rect x="74" y="102" width="38" height="9" rx="3" fill="#2F6FD0"/><rect x="110" y="102" width="9" height="9" rx="2" fill="#F2F2F2"/></g>`,
 d3:`${["#D9534F","#F0AD4E","#5CB85C","#4A90D9","#8E6BBF"].map((c,i)=>`<g transform="rotate(${-16+i*8} 34 104)"><rect x="34" y="24" width="56" height="78" rx="3" fill="${c}"/></g>`).join("")}<g transform="rotate(16 34 104)">${rep(9,i=>`<circle cx="39" cy="${30+i*8.5}" r="2.3" fill="#FFFFFF"/>`)}<rect x="52" y="38" width="28" height="10" rx="1" fill="#FFFFFF"/></g>`,
 d4:`<g transform="rotate(-35 60 60)">${[["#F7E04B","#D9C232"],["#F48FB1","#D86A92"],["#64B5F6","#3D8FD6"],["#81C784","#5AA45E"]].map(([c,d],i)=>{const y=34+i*15;return `<rect x="14" y="${y}" width="62" height="13" rx="3" fill="${c}"/><rect x="74" y="${y}" width="24" height="13" rx="3" fill="${d}"/><path d="M98 ${y+3} l9 3.5 -9 3.5 z" fill="${c}"/><rect x="22" y="${y+4}" width="26" height="5" rx="1" fill="#FFFFFF" stroke="none" opacity=".7"/>`}).join("")}</g>`,
 d5:`${[0,1,2,3].map(i=>`<g transform="rotate(${-18+i*12} 60 108)"><rect x="56" y="18" width="9" height="82" rx="4" fill="${O}"/><rect x="56" y="70" width="9" height="20" rx="3" fill="#5A5F58"/><rect x="58" y="12" width="5" height="8" rx="1" fill="#C3C7CC"/><rect x="64" y="22" width="3" height="26" rx="1" fill="#C3C7CC"/><path d="M58 100 l2.5 8 2.5 -8 z" fill="#C3C7CC"/></g>`).join("")}`,
 d6:`${[[26,62,-8],[22,52,-3],[18,40,4]].map(([x,y,r])=>`<g transform="rotate(${r} 60 70)"><rect x="${x}" y="${y}" width="80" height="48" fill="#FFFFFF"/><path d="M${x} ${y+9}h80" stroke="#E05A4A" stroke-width="1.5"/>${rep(5,i=>`<path d="M${x+2} ${y+17+i*6.5}h76" stroke="#9EC3E8" stroke-width="1"/>`)}</g>`).join("")}`,
 d7:`<rect x="30" y="16" width="5" height="44" fill="#18794E"/><path d="M30 16 l2.5 -6 2.5 6 z" fill="#E8C69A"/><rect x="40" y="24" width="5" height="36" fill="#F5D36B"/><path d="M40 24 l2.5 -6 2.5 6 z" fill="#E8C69A"/><rect x="50" y="20" width="5" height="40" fill="#2F6FD0"/><circle cx="62" cy="30" r="5" fill="none" stroke="#E05A4A" stroke-width="2.5"/><path d="M62 35 v20" stroke="#9AA1A8" stroke-width="3"/>
   <rect x="72" y="24" width="20" height="36" rx="3" fill="#3A3D39"/><rect x="75" y="28" width="14" height="27" rx="1" fill="#7FB6E8"/>
   <rect x="22" y="52" width="76" height="46" rx="4" fill="${O}"/>${rep(9,i=>`<path d="M${28+i*8} 53v44" stroke="#4A4E48" stroke-width="1"/>`)}${rep(5,i=>`<path d="M23 ${60+i*8}h74" stroke="#4A4E48" stroke-width="1"/>`)}<rect x="22" y="52" width="76" height="46" rx="4" fill="none"/><path d="M66 52v46" stroke="#5A5F58" stroke-width="2"/>`,
 s1:`<path d="M10 62 L32 46 H110 L88 62 Z" fill="#CFE6F5"/><rect x="10" y="62" width="78" height="30" fill="#E3F1FA" opacity=".95"/><rect x="18" y="70" width="26" height="16" rx="3" fill="#C78A5A" stroke="none" opacity=".55"/><rect x="48" y="72" width="30" height="14" rx="3" fill="#7FA6D1" stroke="none" opacity=".55"/>
   <path d="M88 62 L110 46 V76 L88 92 Z" fill="#C2DCEE"/><rect x="20" y="57" width="14" height="9" rx="2" fill="#2F6FD0"/><rect x="64" y="57" width="14" height="9" rx="2" fill="#2F6FD0"/><circle cx="20" cy="96" r="4.5" fill="${O}"/><circle cx="78" cy="96" r="4.5" fill="${O}"/><circle cx="102" cy="84" r="4" fill="${O}"/>`,
 s2:`<rect x="16" y="16" width="88" height="96" rx="2" fill="#D9C3A5"/><rect x="26" y="30" width="68" height="34" rx="2" fill="none" stroke="#C4AA88"/><rect x="26" y="72" width="68" height="34" rx="2" fill="none" stroke="#C4AA88"/><path d="M28 8 v18 M92 8 v18" stroke="#9AA1A8" stroke-width="4"/>
   <rect x="18" y="24" width="84" height="7" rx="3" fill="#C3C7CC"/>${rep(6,i=>`<path d="M${25+i*14} 31 v10 q0 7 7 7" fill="none" stroke="#9AA1A8" stroke-width="3"/>`)}<rect x="44" y="46" width="22" height="44" rx="3" fill="#18794E"/><path d="M44 80h22" stroke="#0F5A39" stroke-width="2"/><path d="M80 46 q14 8 10 30 h-20 q-4 -22 10 -30z" fill="#4A90D9"/>`,
 s3:`<rect x="8" y="10" width="104" height="94" rx="2" fill="#EEF0EC" stroke="none"/>${[18,50,82].map(x=>`<rect x="${x+4}" y="22" width="8" height="16" fill="#F5D36B"/><rect x="${x}" y="34" width="18" height="24" rx="3" fill="#FFFFFF"/><path d="M${x+9} 56 v12 q0 9 9 9 q7 0 7 -7" fill="none" stroke="${O}" stroke-width="8"/><path d="M${x+9} 56 v12 q0 9 9 9 q7 0 7 -7" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>`).join("")}`,
 s4:`${["#5A5F58","#7C8288","#9AA1A8"].map((c,i)=>`<g transform="translate(${(i-1)*6} ${i*12})"><path d="M60 40 v-10 a7 7 0 1 1 7 -7" fill="none" stroke="#C3C7CC" stroke-width="3"/><path d="M60 40 L18 74 H102 Z" fill="none" stroke="${c}" stroke-width="7"/></g>`).join("")}`,
 c1:`<rect x="28" y="14" width="64" height="88" rx="6" fill="#F2F3F1"/><path d="M28 44 h64"/><rect x="80" y="24" width="5" height="14" rx="2" fill="#9AA1A8"/><rect x="80" y="52" width="5" height="24" rx="2" fill="#9AA1A8"/><rect x="32" y="102" width="9" height="5" fill="${O}"/><rect x="79" y="102" width="9" height="5" fill="${O}"/><rect x="34" y="90" width="12" height="3" rx="1" fill="#C3C7CC" stroke="none"/>`,
 c2:`<path d="M20 38 q-5 -6 0 -12 q5 -6 0 -12" stroke="#C3C7CC" fill="none"/><path d="M28 34 q-5 -6 0 -12" stroke="#C3C7CC" fill="none"/>
   <rect x="26" y="92" width="66" height="11" rx="4" fill="${O}"/><path d="M36 92 L40 44 Q59 32 78 44 L84 92 Z" fill="#DFE3E6"/><path d="M40 56 L22 46 L24 54 L39 64 Z" fill="#DFE3E6"/><path d="M45 40 Q59 29 73 40 Z" fill="${O}"/><path d="M80 48 Q102 52 97 74 L86 86" fill="none" stroke="${O}" stroke-width="7"/><rect x="68" y="56" width="7" height="28" rx="3" fill="#8FD3FF"/>`,
 c3:`<path d="M20 84 h80 q-4 20 -40 20 q-36 0 -40 -20z" fill="#F2F6F8"/><rect x="18" y="76" width="84" height="9" rx="4" fill="#2F6FD0"/><path d="M28 62 h64 q-3 14 -32 14 q-29 0 -32 -14z" fill="#F2F6F8"/><rect x="26" y="54" width="68" height="9" rx="4" fill="#E05A4A"/><path d="M36 40 h48 q-2 12 -24 12 q-22 0 -24 -12z" fill="#F2F6F8"/><rect x="34" y="32" width="52" height="9" rx="4" fill="#5CB85C"/><rect x="54" y="26" width="12" height="7" rx="2" fill="#5CB85C"/>`,
 t1:`<path d="M18 80 q-12 16 4 24 t40 0" fill="none" stroke="${O}" stroke-width="4"/><g transform="rotate(-18 60 60)"><rect x="12" y="44" width="96" height="28" rx="7" fill="#F2F3F1"/><rect x="18" y="52" width="9" height="12" rx="2" fill="#D9534F"/>${rep(3,i=>{const x=32+i*18;return `<rect x="${x}" y="51" width="14" height="14" rx="3" fill="#E1E3DE"/><rect x="${x+3.5}" y="54" width="2" height="5" fill="${O}" stroke="none"/><rect x="${x+8.5}" y="54" width="2" height="5" fill="${O}" stroke="none"/><circle cx="${x+7}" cy="62" r="1.3" fill="${O}" stroke="none"/>`})}<rect x="88" y="51" width="12" height="4" rx="1" fill="${O}"/><rect x="88" y="60" width="12" height="4" rx="1" fill="${O}"/></g>`,
 t2:`<path d="M46 92 h28 l4 14 h-36 z" fill="${O}"/><rect x="56" y="78" width="8" height="15" fill="#3A3D39"/><circle cx="60" cy="48" r="34" fill="#F2F3F1"/>${[0,120,240].map(a=>`<ellipse cx="60" cy="33" rx="8" ry="14" fill="#7CC4A0" stroke="none" transform="rotate(${a} 60 48)"/>`).join("")}<circle cx="60" cy="48" r="24" fill="none" stroke="#C3C7CC" stroke-width="1.5"/><circle cx="60" cy="48" r="14" fill="none" stroke="#C3C7CC" stroke-width="1.5"/><circle cx="60" cy="48" r="6" fill="${O}"/><circle cx="60" cy="48" r="34" fill="none"/>`,
 t3:`<g fill="none"><ellipse cx="60" cy="56" rx="40" ry="28" stroke="#3A3D39" stroke-width="6"/><ellipse cx="60" cy="56" rx="31" ry="21" stroke="#3A3D39" stroke-width="6"/><ellipse cx="60" cy="56" rx="22" ry="14" stroke="#3A3D39" stroke-width="6"/>
   <ellipse cx="60" cy="56" rx="40" ry="28" stroke="#6B706A" stroke-width="2" stroke-dasharray="3 3"/><ellipse cx="60" cy="56" rx="31" ry="21" stroke="#6B706A" stroke-width="2" stroke-dasharray="3 3"/><ellipse cx="60" cy="56" rx="22" ry="14" stroke="#6B706A" stroke-width="2" stroke-dasharray="3 3"/>
   <path d="M98 64 L104 84" stroke="#3A3D39" stroke-width="6"/><path d="M24 66 L16 86" stroke="#3A3D39" stroke-width="6"/></g><rect x="98" y="82" width="13" height="20" rx="3" fill="#C3C7CC"/><rect x="101" y="100" width="7" height="5" rx="1" fill="#9AA1A8"/><rect x="9" y="84" width="13" height="20" rx="3" fill="#C3C7CC"/><rect x="12" y="102" width="7" height="5" rx="1" fill="#9AA1A8"/>`,
 l1:`<path d="M26 34 L33 100 H87 L94 34 Z" fill="#8A8F88"/>${rep(6,i=>`<path d="M${38+i*9} 36 l-1 62" stroke="#A9AEA7" stroke-width="1"/>`)}${rep(6,i=>`<path d="M29 ${46+i*9}h62" stroke="#A9AEA7" stroke-width="1"/>`)}<path d="M26 34 L33 100 H87 L94 34 Z" fill="none"/>
   <rect x="18" y="46" width="11" height="18" rx="3" fill="${O}"/><rect x="91" y="46" width="11" height="18" rx="3" fill="${O}"/><ellipse cx="60" cy="34" rx="34" ry="7" fill="#3A3D39"/>
   <path d="M34 34 q4 -16 18 -10 q8 -14 20 -4 q12 -4 14 14 z" fill="#F48FB1"/><path d="M50 34 q6 -10 16 -2 l4 2z" fill="#7FA6D1"/>`,
 l2:`<path d="M30 46 L36 100 H84 L90 46 Z" fill="#FFFFFF"/><rect x="26" y="34" width="68" height="13" rx="4" fill="#18794E"/><rect x="36" y="60" width="48" height="24" rx="3" fill="#E4F2EA"/><circle cx="60" cy="72" r="7" fill="#2F6FD0"/><path d="M60 65 a7 7 0 0 1 7 7 h-7z" fill="#F5D36B"/>
   <circle cx="100" cy="96" r="9" fill="#2F6FD0"/><path d="M100 87 a9 9 0 0 1 9 9 h-9z" fill="#F5D36B"/><circle cx="18" cy="98" r="8" fill="#2F6FD0"/><path d="M18 90 a8 8 0 0 1 8 8 h-8z" fill="#E05A4A"/>`,
 l3:`${[[14,0],[70,0],[42,10]].map(([x,dy])=>`<g transform="translate(${x} ${dy})"><rect x="0" y="40" width="36" height="58" rx="7" fill="#F2F3F1"/><rect x="0" y="58" width="36" height="22" fill="#3D8FD6"/><rect x="-2" y="32" width="40" height="11" rx="5" fill="#18794E"/><path d="M14 32 q-6 -12 4 -16 q8 4 2 16 z" fill="#FFFFFF"/></g>`).join("")}`
};
function art(p){
  const inner=ART[p.id];
  if(!inner)return svg(p.cat);
  return `<svg class="art" viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="108" rx="42" ry="5" fill="rgba(0,0,0,.07)"/><g stroke="${O}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
}


/* ---------- helpers + saved state ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>"$"+n.toFixed(2);
const esc=s=>String(s).replace(/[<>&"]/g,"");
const svg=c=>`<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c]}</svg>`;
const PAGE=document.body.dataset.page||"";
const params=new URLSearchParams(location.search);
const store={
  get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};
const saved=store.get("dd-cart",{})||{};
let cart=(saved.cart&&typeof saved.cart==="object")?saved.cart:{};
let hall=+saved.hall||0;
for(const k in cart){if(!byId[k]||!(cart[k]>0))delete cart[k];}
if(!(hall>=0&&hall<HALLS.length))hall=0;
let orders=store.get("dd-orders",[]);if(!Array.isArray(orders))orders=[];
let user=store.get("dd-user","");if(typeof user!=="string")user="";
let speed="std",view="cart";
function save(){store.set("dd-cart",{cart,hall});}
function saveOrders(){store.set("dd-orders",orders);}
function arrival(){const t=new Date(Date.now()+HALLS[hall][1]*60000);return t.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"});}
/* Coming back with the Back button can show an old copy of the page; reload so the cart is current */
window.addEventListener("pageshow",e=>{if(e.persisted)location.reload();});

/* ---------- header: hall picker, search, menu, account ---------- */
const hallSel=$("#hall");
hallSel.innerHTML=HALLS.map((h,i)=>`<option value="${i}">${h[0]}</option>`).join("");
hallSel.value=hall;
hallSel.addEventListener("change",()=>setHall(+hallSel.value));
function setHall(i){hall=i;hallSel.value=i;save();refresh();if(drawerOpen()&&view!=="done")renderDrawer();}

$("#searchForm").addEventListener("submit",e=>{
  e.preventDefault();
  const t=$("#q").value.trim();
  if(PAGE==="shop"){shop.q=t;renderGrid();$("#results").scrollIntoView({behavior:"smooth"});}
  else location.href="products.html"+(t?"?q="+encodeURIComponent(t):"");
});

const menuBtn=$("#menuBtn"),nav=$("#nav");
function setMenu(on){nav.classList.toggle("open",on);menuBtn.setAttribute("aria-expanded",on);}
menuBtn.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
document.addEventListener("click",e=>{if(nav.classList.contains("open")&&!e.target.closest("#nav,#menuBtn"))setMenu(false);});

function renderUser(){$("#acctLabel").textContent=user?"Hi, "+user:"Sign in";}
$("#acct").addEventListener("click",()=>openDrawer(user?"account":"signin"));

/* ---------- product card ---------- */
function stars(r){return `<span class="s" aria-hidden="true">★★★★★<i style="width:${r/5*100}%">★★★★★</i></span>`;}
function card(p){
  const sale=p.reg&&p.reg>p.price;
  return `<article class="card">
    <div class="img">${art(p)}${p.ra?`<span class="flag ra">RA-approved</span>`:sale?`<span class="flag">Sale</span>`:p.nw?`<span class="flag">New</span>`:""}<span class="spec">${p.spec}</span></div>
    <div class="price num"><b class="${sale?"sale":""}">${money(p.price)}</b>${sale?`<s>reg ${money(p.reg)}</s><span class="tag">Save ${Math.round((1-p.price/p.reg)*100)}%</span>`:""}</div>
    <h3>${p.name}</h3>
    ${p.d?`<p class="desc">${p.d}</p>`:""}
    <div class="stars">${stars(p.r)}<span class="num">${p.r.toFixed(1)} (${p.n.toLocaleString()})</span><span class="sr">${p.r} out of 5 stars</span></div>
    <div class="ship">Dash to <b>${placeName()}</b> by <b>${arrival()}</b></div>
    <button class="add" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart">Add to cart</button>
  </article>`;
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-add]");if(!b)return;
  add(b.dataset.add);b.textContent="Added ✓";b.classList.add("done");
  setTimeout(()=>{b.textContent="Add to cart";b.classList.remove("done");},1100);
});

/* ---------- home: rails ---------- */
function renderRails(){
  if($("#rail"))$("#rail").innerHTML=P.filter(p=>p.reg).map(card).join("");
  if($("#best"))$("#best").innerHTML=[...P].sort((a,b)=>b.n-a.n).slice(0,8).map(card).join("");
}

/* ---------- category circles (home links to the shop; on the shop page they filter) ---------- */
function renderCircles(){
  const el=$("#circles");if(!el)return;
  el.innerHTML=CATS.map(([k,l])=>{
    const on=PAGE==="shop"&&shop.cats.size===1&&shop.cats.has(k);
    return `<a class="circ" href="products.html?cat=${k}" data-cat="${k}"${on?' aria-current="true"':""}><span class="disc">${svg(k)}</span>${l}</a>`;
  }).join("");
}

/* ---------- shop page ---------- */
const shop={cats:new Set(),q:"",max:0,sale:false,ra:false,nw:false,sort:"feat"};
function shopURL(){
  const u=new URLSearchParams();
  if(shop.cats.size===1)u.set("cat",[...shop.cats][0]);
  const v=shop.sale?"deals":shop.ra?"ra":shop.nw?"new":"";if(v)u.set("view",v);
  if(shop.q.trim())u.set("q",shop.q.trim());
  const s=u.toString();return "products.html"+(s?"?"+s:"");
}
function renderFilters(){
  $("#fCats").innerHTML=CATS.map(([k,l])=>`<label class="fopt"><input type="checkbox" value="${k}" ${shop.cats.has(k)?"checked":""}> ${l}<span class="n num">${P.filter(p=>p.cat===k).length}</span></label>`).join("");
  $("#fSale").checked=shop.sale;$("#fRa").checked=shop.ra;$("#fNew").checked=shop.nw;
}
function renderGrid(){
  if(PAGE!=="shop")return;
  const term=shop.q.trim().toLowerCase();
  let list=P.filter(p=>(!shop.cats.size||shop.cats.has(p.cat))&&(!shop.max||p.price<shop.max)&&(!shop.sale||p.reg)&&(!shop.ra||p.ra)&&(!shop.nw||p.nw)
    &&(!term||(p.name+" "+p.spec+" "+p.d+" "+p.cat+(p.ra?" ra-approved":"")).toLowerCase().includes(term)));
  if(shop.sort==="low")list.sort((a,b)=>a.price-b.price);
  if(shop.sort==="high")list.sort((a,b)=>b.price-a.price);
  if(shop.sort==="rating")list.sort((a,b)=>b.r-a.r);
  const title=term?`Results for "${esc(shop.q.trim())}"`:shop.cats.size===1?CATS.find(c=>shop.cats.has(c[0]))[1]:shop.nw?"New arrivals":shop.ra?"RA-approved":shop.sale?"Deals":"All products";
  $("#resTitle").innerHTML=`${title}<span class="count num">${list.length} item${list.length===1?"":"s"}</span>`;
  $("#grid").innerHTML=list.length?list.map(card).join(""):`<div class="empty"><b style="color:var(--text)">No matches</b><br>Try "Twin XL", "lamp" or <button class="linkbtn" id="clearAll">clear all filters</button>.</div>`;
  const c=$("#clearAll");if(c)c.onclick=clearFilters;
  try{history.replaceState(null,"",shopURL());}catch(e){}
}
function clearFilters(){
  Object.assign(shop,{q:"",max:0,sale:false,ra:false,nw:false});shop.cats.clear();
  $("#q").value="";$('input[name="price"][value="0"]').checked=true;
  renderFilters();renderCircles();renderGrid();
}
if(PAGE==="shop"){
  const c=params.get("cat");if(c&&CATS.some(x=>x[0]===c))shop.cats.add(c);
  const v=params.get("view");shop.sale=v==="deals";shop.ra=v==="ra";shop.nw=v==="new";
  shop.q=params.get("q")||"";$("#q").value=shop.q;
  const so=params.get("sort");if(["low","high","rating"].includes(so)){shop.sort=so;$("#sort").value=so;}
  $("#q").addEventListener("input",e=>{shop.q=e.target.value;renderGrid();});
  $("#circles").addEventListener("click",e=>{
    const a=e.target.closest("[data-cat]");if(!a)return;e.preventDefault();
    const k=a.dataset.cat,only=shop.cats.size===1&&shop.cats.has(k);
    shop.cats=only?new Set():new Set([k]);
    renderFilters();renderCircles();renderGrid();
    $("#results").scrollIntoView({behavior:"smooth"});
  });
  $("#fCats").addEventListener("change",e=>{const k=e.target.value;e.target.checked?shop.cats.add(k):shop.cats.delete(k);renderCircles();renderGrid();});
  $$('input[name="price"]').forEach(r=>r.addEventListener("change",()=>{shop.max=+r.value;renderGrid();}));
  $("#fSale").addEventListener("change",e=>{shop.sale=e.target.checked;renderGrid();});
  $("#fRa").addEventListener("change",e=>{shop.ra=e.target.checked;renderGrid();});
  $("#fNew").addEventListener("change",e=>{shop.nw=e.target.checked;renderGrid();});
  $("#sort").addEventListener("change",e=>{shop.sort=e.target.value;renderGrid();});
  $("#filterBtn").addEventListener("click",()=>{const f=$("#filters"),on=!f.classList.contains("show");f.classList.toggle("show",on);$("#filterBtn").setAttribute("aria-expanded",on);});
  renderFilters();
  if(c||v||shop.q||so)requestAnimationFrame(()=>$("#results").scrollIntoView());
}

/* ---------- cart ---------- */
function add(id){cart[id]=(cart[id]||0)+1;save();updateCount();toast(byId[id].name+" added to cart");if(drawerOpen()&&view==="cart")renderDrawer();}
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal=()=>Object.entries(cart).reduce((a,[id,n])=>a+byId[id].price*n,0);
const fee=()=>speed==="dash"?DASH_FEE:(subtotal()>=FREE_AT?0:STD_FEE);
function updateCount(){const n=count();$("#cartCount").textContent=n;$("#tabCount").textContent=n;}
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),1800);}

const drawer=$("#drawer"),scrim=$("#scrim");
const drawerOpen=()=>drawer.classList.contains("open");
let lastFocus=null;
function openDrawer(v){
  view=v||"cart";lastFocus=document.activeElement;setMenu(false);
  renderDrawer();drawer.classList.add("open");scrim.classList.add("open");drawer.setAttribute("aria-hidden","false");
  setTimeout(()=>$("#closeCart").focus(),50);
}
function closeDrawer(){
  drawer.classList.remove("open");scrim.classList.remove("open");drawer.setAttribute("aria-hidden","true");
  if(view==="done")view="cart";
  if(lastFocus&&lastFocus.offsetParent)lastFocus.focus();
}
$("#openCart").addEventListener("click",()=>openDrawer("cart"));
$("#tabCart").addEventListener("click",()=>openDrawer("cart"));
$("#closeCart").addEventListener("click",closeDrawer);
scrim.addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(drawerOpen())closeDrawer();else setMenu(false);}});

function summaryHTML(){const s=subtotal(),f=fee();return `<div class="sum num">
  <div><span>Subtotal (${count()} item${count()===1?"":"s"})</span><span>${money(s)}</span></div>
  <div><span>${speed==="dash"?"Dash delivery":"Standard delivery"}</span><span>${f===0?"Free":money(f)}</span></div>
  <div class="total"><span>Total</span><span>${money(s+f)}</span></div></div>`;}
const val=id=>{const el=$(id);return el?el.value.trim():"";};

function renderDrawer(){
  const body=$("#dBody"),foot=$("#dFoot"),ids=Object.keys(cart),title=$("#dTitle");
  if(view==="signin"){
    title.textContent="Sign in";drawer.setAttribute("aria-label","Sign in");
    body.innerHTML=`<p class="note" style="font-size:14px;margin:0">Save your hall, see past orders and check out faster.</p>
      <form class="form" id="signinForm" novalidate>
        <div class="field"><label for="sEmail">Student email</label><input id="sEmail" type="email" placeholder="you@school.edu" autocomplete="email"></div>
        <div class="field"><label for="sPass">Password</label><input id="sPass" type="password" autocomplete="current-password"></div>
        <div class="ok bad" id="sErr" role="status" hidden></div>
      </form>`;
    foot.innerHTML=`<button class="pill green wide" type="submit" form="signinForm">Sign in</button>`;
    $("#signinForm").addEventListener("submit",e=>{
      e.preventDefault();const em=val("#sEmail");
      const err=!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)?"Enter your student email.":!val("#sPass")?"Enter your password.":"";
      if(err){$("#sErr").hidden=false;$("#sErr").textContent=err;return;}
      user=esc(em.split("@")[0]).slice(0,20);store.set("dd-user",user);renderUser();toast("Signed in as "+user);view="account";renderDrawer();
    });
    return;
  }
  drawer.setAttribute("aria-label","Cart");
  if(view==="account"){
    title.textContent="Your account";drawer.setAttribute("aria-label","Your account");
    body.innerHTML=`<div class="slip"><div><span>Signed in as</span><b>${user}</b></div><div><span>Delivering to</span><b>${HALLS[hall][0]}</b></div><div><span>Orders on this device</span><b class="num">${orders.length}</b></div></div>
      <a class="pill ghost wide" href="contact.html#track">Track your orders</a>`;
    foot.innerHTML=`<button class="pill ghost wide" id="signOut">Sign out</button>`;
    $("#signOut").onclick=()=>{user="";store.set("dd-user","");renderUser();toast("Signed out");closeDrawer();};
    return;
  }
  if(view==="done")return;
  if(!ids.length){
    title.textContent="Cart";
    body.innerHTML=`<div class="empty"><b style="color:var(--text);font-size:16px">Your cart is empty</b><br>Add a few essentials and we'll bring them to ${placeName()}.</div>`;
    foot.innerHTML=`<a class="pill green wide" href="products.html" id="keep">Start shopping</a>`;
    if(PAGE==="shop")$("#keep").onclick=e=>{e.preventDefault();closeDrawer();};
    return;
  }
  if(view==="cart"){
    title.textContent="Cart";
    const s=subtotal(),left=Math.max(0,FREE_AT-s);
    body.innerHTML=`<div class="progress">${left>0?`You're <b>${money(left)}</b> away from free standard delivery`:`<b>You've got free standard delivery</b>`}<div class="pbar"><i style="width:${Math.min(100,s/FREE_AT*100)}%"></i></div></div>
      ${ids.map(id=>{const p=byId[id];return `<div class="line">
        <div class="mini">${art(p)}</div>
        <div style="min-width:0"><b>${p.name}</b><span class="unit">${money(p.price)} each · ${p.spec}</span>
          <div class="qty"><button data-dec="${id}" aria-label="Decrease ${esc(p.name)}">−</button><span class="num">${cart[id]}</span><button data-inc="${id}" aria-label="Increase ${esc(p.name)}">+</button></div></div>
        <span class="line-total num">${money(p.price*cart[id])}</span></div>`}).join("")}`;
    foot.innerHTML=`<div class="speed" role="radiogroup" aria-label="Delivery speed">
        <label><input type="radio" name="sp" value="std" ${speed==="std"?"checked":""}><b>Standard</b><span class="note">2–4 hours · ${s>=FREE_AT?"Free":money(STD_FEE)}</span></label>
        <label><input type="radio" name="sp" value="dash" ${speed==="dash"?"checked":""}><b>Dash</b><span class="note">By ${arrival()} · ${money(DASH_FEE)}</span></label>
      </div>${summaryHTML()}
      <button class="pill green wide" id="toCheckout">Check out</button>`;
    foot.querySelectorAll('input[name="sp"]').forEach(r=>r.onchange=()=>{speed=r.value;renderDrawer();});
    $("#toCheckout").onclick=()=>{view="checkout";renderDrawer();};
  } else if(view==="checkout"){
    title.textContent="Checkout";
    body.innerHTML=`<form class="form" id="coForm" novalidate>
        <div class="field"><label for="coName">Full name</label><input id="coName" autocomplete="name"><span class="err" id="eName"></span></div>
        <div class="field"><label for="coEmail">Student email</label><input id="coEmail" type="email" placeholder="you@school.edu" autocomplete="email"><span class="err" id="eEmail"></span></div>
        <div class="${isOther()?"form":"row2"}">
          <div class="field"><label for="coHall">Deliver to</label><select id="coHall">${HALLS.map((h,i)=>`<option value="${i}" ${i===hall?"selected":""}>${h[0]}</option>`).join("")}</select></div>
          ${isOther()
            ?`<div class="field"><label for="coAddr">Delivery address</label><input id="coAddr" placeholder="Street address, apt or unit" autocomplete="street-address"><span class="err" id="eAddr"></span></div>
              <div class="field"><label for="coNotes">Delivery notes (optional)</label><input id="coNotes" placeholder="Gate code, building entrance, landmarks"></div>`
            :`<div class="field"><label for="coRoom">Room</label><input id="coRoom" placeholder="214B"><span class="err" id="eRoom"></span></div>`}
        </div>
        <div class="field"><label for="coPhone">Phone for arrival text</label><input id="coPhone" type="tel" autocomplete="tel" placeholder="(555) 123-4567"><span class="err" id="ePhone"></span></div>
        <div class="field"><label for="coPay">Payment</label><select id="coPay"><option>Card on file</option><option>Campus card</option><option>Pay at the door</option></select></div>
        <p class="note">Demo storefront. Placing an order doesn't charge anything.</p>
      </form>`;
    foot.innerHTML=`${summaryHTML()}<div style="display:flex;gap:10px"><button class="pill ghost" id="back">Back</button><button class="pill green" id="place" style="flex:1">Place order</button></div>`;
    $("#coHall").onchange=e=>{
      const keep={n:val("#coName"),e:val("#coEmail"),p:val("#coPhone"),pay:$("#coPay").value};
      hall=+e.target.value;hallSel.value=hall;save();refresh();renderDrawer();
      $("#coName").value=keep.n;$("#coEmail").value=keep.e;$("#coPhone").value=keep.p;$("#coPay").value=keep.pay;
      $("#coHall").focus();
    };
    $("#back").onclick=()=>{view="cart";renderDrawer();};
    $("#coForm").addEventListener("submit",e=>{e.preventDefault();place();});
    $("#place").onclick=place;
  }
}
$("#dBody").addEventListener("click",e=>{
  const i=e.target.closest("[data-inc]"),d=e.target.closest("[data-dec]");
  if(i)cart[i.dataset.inc]++;
  else if(d){const id=d.dataset.dec;cart[id]--;if(cart[id]<=0)delete cart[id];}
  else return;
  save();updateCount();renderDrawer();
});

function place(){
  let ok=true;
  const set=(id,m)=>{$(id).textContent=m;if(m)ok=false;};
  set("#eName",val("#coName")?"":"Enter your name so the runner can find you.");
  set("#eEmail",/^[^@\s]+@[^@\s]+\.edu$/i.test(val("#coEmail"))?"":"Use your school email ending in .edu.");
  if(isOther())set("#eAddr",val("#coAddr").length>=6?"":"Enter the street address we should deliver to.");
  else set("#eRoom",val("#coRoom")?"":"Add your room number.");
  set("#ePhone",val("#coPhone").replace(/\D/g,"").length>=10?"":"Enter a 10-digit phone number.");
  if(!ok){const f=document.querySelector(".err:not(:empty)");if(f)f.previousElementSibling.focus();return;}
  const total=subtotal()+fee(),items=count(),h=HALLS[hall];
  const eta=speed==="dash"?`By ${arrival()}`:"2–4 hours";
  const no="DD-"+(41000+Math.floor(Math.random()*58000));
  const dest=isOther()?esc(val("#coAddr")):`${h[0]}, Rm ${esc(val("#coRoom"))}`,phone=esc(val("#coPhone"));
  orders.unshift({no,dest,items,total,eta,ts:Date.now(),mins:speed==="dash"?h[1]:180});
  orders=orders.slice(0,10);saveOrders();
  view="done";cart={};save();updateCount();renderTrack();
  $("#dTitle").textContent="Order placed";
  $("#dBody").innerHTML=`<div class="confirm"><div class="check" aria-hidden="true">✓</div><h3>Thanks for your order</h3>
    <p class="note" style="font-size:14px">We'll text ${phone} when your runner arrives.</p>
    <div class="slip num"><div><span>Order</span><b>${no}</b></div><div><span>Deliver to</span><b style="text-align:right">${dest}</b></div><div><span>Items</span><b>${items}</b></div><div><span>Arrives</span><b>${eta}</b></div><div><span>Total</span><b>${money(total)}</b></div></div></div>`;
  $("#dFoot").innerHTML=`<a class="pill ghost wide" href="contact.html#track">Track this order</a><button class="pill green wide" id="again">Continue shopping</button>`;
  $("#again").onclick=closeDrawer;
}

/* ---------- contact page: order tracking ---------- */
const STAGES=["Order placed","Packed","On the way","Delivered"];
function stage(o){const f=(Date.now()-o.ts)/(o.mins*60000);return f<.1?0:f<.4?1:f<1?2:3;}
function orderCard(o){const s=stage(o);return `<div class="order-card">
  <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><b>${esc(o.no)}</b><span class="num">${money(+o.total||0)} · ${o.items} item${o.items===1?"":"s"}</span></div>
  <span class="note">To ${esc(o.dest)} · placed ${new Date(o.ts).toLocaleString([], {month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>
  <div class="track-steps">${STAGES.map((n,i)=>`<span class="${i<=s?"on":""}">${n}</span>`).join("")}</div></div>`;}
function renderTrack(){
  const el=$("#recentOrders");if(!el)return;
  el.innerHTML=orders.length?orders.map(orderCard).join(""):`<p class="note" style="font-size:14px">Orders you place on this device show up here.</p>`;
}
if($("#trackForm"))$("#trackForm").addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("#trackNo").value.trim().toUpperCase(),o=orders.find(x=>x.no===n);
  $("#trackResult").innerHTML=!n?`<div class="ok bad" style="margin-top:12px">Enter an order number.</div>`
    :o?orderCard(o):`<div class="ok bad" style="margin-top:12px">We couldn't find ${esc(n)}. Check the number on your confirmation; it starts with DD-.</div>`;
});

/* ---------- how it works page: halls ---------- */
function renderHalls(){
  const el=$("#hallList");if(!el)return;
  el.innerHTML=HALLS.map((h,i)=>`<div class="hall ${i===hall?"sel":""}"><b>${h[0]}</b><span>Dash in about ${h[1]} min</span>
    ${i===hall?`<span style="color:var(--green);font-weight:700">Your delivery location</span>`:`<button class="pill green" data-sethall="${i}">Deliver here</button>`}</div>`).join("");
}
if($("#hallList"))$("#hallList").addEventListener("click",e=>{const b=e.target.closest("[data-sethall]");if(!b)return;setHall(+b.dataset.sethall);toast("Delivering to "+HALLS[hall][0]);});
$$('[data-act="office"]').forEach(b=>b.addEventListener("click",()=>{setHall(OTHER);toast("Delivery set to Other / Off Campus");}));

/* ---------- about page: apply buttons pick the role ---------- */
$$("[data-role]").forEach(b=>b.addEventListener("click",()=>{
  $("#rRole").value=b.dataset.role;$("#apply").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>$("#rName").focus({preventScroll:true}),400);
}));

/* ---------- FAQ page: search ---------- */
if($("#faqSearch")){
  const items=$$(".faq-item");
  $("#faqSearch").addEventListener("input",e=>{
    const t=e.target.value.trim().toLowerCase();let shown=0;
    items.forEach(d=>{const hit=!t||d.textContent.toLowerCase().includes(t);d.hidden=!hit;if(hit)shown++;if(t&&hit)d.open=true;});
    $$(".faq-group").forEach(g=>g.hidden=!g.querySelector(".faq-item:not([hidden])"));
    $("#faqNone").hidden=shown>0;
  });
}

/* ---------- simple forms (contact, returns, applications) ---------- */
$$("form.demo").forEach(f=>f.addEventListener("submit",e=>{
  e.preventDefault();
  const msg=f.querySelector(".ok");
  const bad=[...f.querySelectorAll("[required]")].find(i=>!i.value.trim()||(i.type==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())));
  msg.hidden=false;
  if(bad){msg.className="ok bad";const l=f.querySelector(`label[for="${bad.id}"]`);msg.textContent=`Check the "${l?l.textContent:"highlighted"}" field.`;bad.focus();return;}
  msg.className="ok";msg.textContent=f.dataset.ok;f.reset();
}));

/* ---------- start ---------- */
function refresh(){renderRails();renderGrid();renderHalls();}
renderCircles();refresh();renderTrack();updateCount();renderUser();
