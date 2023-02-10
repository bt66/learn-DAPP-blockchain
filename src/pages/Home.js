import React, { useEffect, useState } from 'react'
import useMetaMask from '../hooks/useMetaMask'
import nftContract from '../contracts/nftAbi.json';
import Header from '../components/Header';
import MetamaskLogo from '../assets/metamask.svg';

function Home() {
    useEffect(() => {
        const color = "#000000";
        document.body.style.background = color;
    })

    const [donate, setDonate] = useState({
        amount: "",
        nftMetadataUrl : "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setDonate((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }
    



    const { connect, disconnect, isActive, account, cleanDisconnect, donateBalance, createNft } = useMetaMask()
    const handleNFT = (event) => {
        event.preventDefault();
        console.log(donate.nftMetadataUrl);
        createNft(donate.nftMetadataUrl)

    }

    const handleDonate = (event) => {
        event.preventDefault();
        console.log(donate.amount)
        donateBalance(donate.amount)
    }
    return (
        <div>
            <Header/>
            {/* content */}
            <div className='m-2 rounded-md bg-gray-900'>

                <div className='flex justify-center items-center border-solid'>
                    {/* contant 1 */}
                    <div className='text-white flex-col mt-10'>
                        {/* open metamask */}
                        <div className='m-2 h-10 w-64 flex bg-purple-800 rounded-sm' onClick={connect}>
                            <img src={MetamaskLogo} className="w-15"></img>
                            <div className='flex justify-center items-center'>
                                <p>Connect to metamask wallet</p>
                            </div>
                        </div>
                        <div className='m-2 h-10 w-64 flex bg-slate-500 rounded-sm' onClick={disconnect}>
                            <div className='flex w-full justify-center items-center'>
                                <p className=''>Disconnect</p> 
                            </div>
                        </div>
                        <div className='m-2 h-10 w-64 flex bg-slate-500 rounded-sm' onClick={cleanDisconnect}>
                            <div className='flex w-full justify-center items-center'>
                                <p className=''>Clean Disconnect</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center p-5'>
                    <div className='text-white flex-row justify-center truncate w-full h-full'>
                        <p className='text-center'>Wallet status :</p>
                        { isActive ? <p className='text-center'>Connected</p> : <p></p> }
                        { isActive ? <p className='text-center'>{account}</p> : <p className='text-center'>Not Connected</p> }
                    </div>
                </div>
            </div>
            <div className='m-2 p-2 rounded-md bg-gray-900 text-white'>
                <p className='text-center text-xl'>Donnation</p>
                <div className='flex items-center justify-center'>
                    <div className='flex-row'>
                        <div className='flex item-center justify-center'>
                            <input 
                                type="number" 
                                name="amount" 
                                placeholder='Amount' 
                                value={donate.amount}
                                onChange={handleInputChange}
                                className='px-3 mt-4 py-2 rounded-full w-11/12 text-black'/>
                        </div>
                        <div className='m-2 h-10 w-64 flex bg-yellow-500 rounded-sm' onClick={handleDonate}>
                            <div className='flex w-full justify-center items-center'>
                                <p className=''>Donate</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-2 p-2 rounded-md bg-gray-900 text-white'>
                <p className='text-center text-xl'>NFT</p>
                <div className='flex items-center justify-center'>
                    <div className='flex-row'>
                        <div className='flex item-center justify-center'>
                            <input 
                                type="text" 
                                name="nftMetadataUrl" 
                                placeholder='nftMetadataUrl' 
                                value={donate.nftMetadataUrl}
                                onChange={handleInputChange}
                                className='px-3 mt-4 py-2 rounded-full w-11/12 text-black'/>
                        </div>
                        <div className='m-2 h-10 w-64 flex bg-yellow-500 rounded-sm' onClick={handleNFT}>
                            <div className='flex w-full justify-center items-center'>
                                <p className=''>Create NFT</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home