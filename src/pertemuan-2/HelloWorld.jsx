export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>

            <GreetingBinjai/>

            <QuoteText/>

            <UserCard 
	            nama="Fikri" 
	            nim="169412"
	            tanggal={new Date().toLocaleDateString()}
	          />
            <UserCard{...propsUserCard}/>

            <img src="img/duck.gif" alt="duck"/>

        </div>
    )
}

function GreetingBinjai(){
    return (
        <small>Salam dari Binjai</small>
    );
}

function QuoteText() {
    const text = "Mulutmu Bebekmu";
    const text2 = "Aku ingin punya bebek";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}