import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/injected'
import { useWeb3React } from '@web3-react/core';
import abiInterfacesNFT from "../contracts/nftAbi.json"
import abiInterfacesDonnation from "../contracts/donnationAbi.json" 

export const MetaMaskContext = React.createContext(null)
const contractAddressNFT = "0x85e9312eF1cb34Ef71eF6cFf3D594A7bfDEfB2F7";
// const contractAddressNFT = "0x75badc61cFf93F5e96714a23D334e4f6e96c89BD";
const contractAddressDonnation = "0x16B0CFF97171c7c7C1eFF6FA17d1055024FCf5f8";
export const MetaMaskProvider = ({ children }) => {

    const { chainId, account, activate, deactivate, setError, active, library ,connector } = useWeb3React()

    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Init Loading
    useEffect(() => {
        connect().then(val => {
            setIsLoading(false)
        })
    }, [])

    const handleIsActive = useCallback(() => {
        setIsActive(active)
    }, [active])

    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

    // Connect to MetaMask wallet
    const connect = async () => {
        console.log('Connecting to MetaMask Wallet')
        try {
            await activate(injected)
        } catch(error) {
            console.log('Error on connecting: ', error)
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Deactivating...')
        try {
            await deactivate()
        } catch(error) {
            console.log('Error on disconnecting: ', error)
        }
    }

    const cleanDisconnect = async () => {
        connector.getProvider().then((result) => {
            console.log(result)
        })
        console.log('clean close connection');
        try {
            await connector.console();
        }catch(error) {
            console.log('Error on clean disconnect', error)
        }
    }

    const donateBalance = async (amount) => {
        // console.log(library)
        console.log(account)
        const donnation = new library.eth.Contract(abiInterfacesDonnation,contractAddressDonnation,account);
        donnation.methods.donate().send({
            value: library.utils.toWei(`${amount}`, 'ether'),
            from: account
        }).then((result) => {
            console.log((result))
        })
    }

    const createNft = async (metadataUrl) => {
        console.log("creating NFT")
        const nft = new library.eth.Contract(abiInterfacesNFT,contractAddressNFT);
        nft.methods.safeMint(account, metadataUrl).send({
            from: account
        }).then((result) => {
            console.log(result)
        })
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect,
            donateBalance,
            cleanDisconnect,
            createNft
        }),
        [isActive, isLoading]
    )

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() {
    const context = React.useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
    }

    return context
}