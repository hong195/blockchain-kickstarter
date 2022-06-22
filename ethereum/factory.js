import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9Eeb89E49eC21fb71a179D13162a99a566162958'
)

export default instance