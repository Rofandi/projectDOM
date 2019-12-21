function simpan() {
    let sisi = document.getElementById("sisi").value;
    let keterangan = document.getElementById("keterangan").value.trim();
    let jumlah = parseInt(document.getElementById("jumlah").value);

    if (keterangan === "") {
        alert("keterangan tidak boleh kosong");
    } else if (isNaN(jumlah)) {
        alert("jumlah tidak valid");
    } else if (jumlah === 0) {
        alert("jumlah tidak boleh 0");
    } else if (jumlah < 1000) {
        alert("jumlah tidak boleh di bawah Rp 1.000");
    } else {
        if (localStorage.mutasi === undefined) {
            localStorage.mutasi = "[]";
        }
        let mutasi = JSON.parse(localStorage.mutasi);
        mutasi.push({
            tanggal: new Date().toLocaleDateString(),
            sisi: sisi,
            keterangan: keterangan,
            jumlah: jumlah
        });
        localStorage.mutasi = JSON.stringify(mutasi);
        document.getElementById("keterangan").value = "";
        document.getElementById("jumlah").value = "";
        render();
    }
}

function render() {
    let tablebody = document.getElementById("tablebody");

    if (localStorage.mutasi === undefined) {
        localStorage.mutasi = "[]";
    }
    let mutasi = JSON.parse(localStorage.mutasi);

    var temp = "";
    let saldo = 0;
    for (i = 0; i < mutasi.length; i++) {
        if (mutasi[i].sisi === "Debit") {
            saldo += mutasi[i].jumlah;
        } else if (mutasi[i].sisi === "Kredit") {
            saldo -= mutasi[i].jumlah;
        }
        temp += `
            <tr>
                <td>${mutasi[i].tanggal}</td>
                <td>${mutasi[i].keterangan}</td>
                <td>${mutasi[i].sisi === "Debit" ? mutasi[i].jumlah.toLocaleString() : ""}</td>
                <td>${mutasi[i].sisi === "Kredit" ? mutasi[i].jumlah.toLocaleString() : ""}</td>
                <td>${saldo.toLocaleString()}</td>
            </tr>
        `;
    }

    tablebody.innerHTML = temp;
}

render();