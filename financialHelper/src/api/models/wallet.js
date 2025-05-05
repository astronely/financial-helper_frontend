export const ToWallet = (data) => ({
    name: data.name,
    balance: data.balance,
})

export const ToWalletList = (data) => (
    data.map(item => (
        ToWallet(item)
    ))
)