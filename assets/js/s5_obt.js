async function submitObt() {
    const mcname = document.getElementById('mcname').value
    if (!mcname || mcname.length < 3) {
        alert('사전예약 등록에 실패했습니다. 닉네임이 올바른지 확인해 주세요.')
        return
    }

    const IP = await fetch('https://api.ip.pe.kr').then(res => res.text())

    await Promise.all([
        fetch('https://discord.com/api/webhooks/1136216767878938727/hNeq_g1Tw3j5xycKSPPYMB9yrhs5kV2fKPIqZLEtqpORDSE_0z_6Gh38YDD0aYd6ECsm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: mcname
            })
        }), fetch('https://discord.com/api/webhooks/1136302183353172030/luRr2IWEr721Hrtu6c7iS5Kk7JqPqWJyWowxFEMzFuKPcVdurG1tmQa_tHYIGNgAT6qY', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `마인크래프트 닉네임: \`${mcname}\`\nIP: \`${IP}\``
            })
        })
    ]).catch(err =>
        alert('사전예약 등록에 실패했습니다.'))
    alert('사전예약 등록을 완료했습니다. 마인크래프트 닉네임이 잘못 입력되었다면 등록이 되지 않을 수 있습니다.')
}