import React, {Component} from 'react'
import {Form, Input, Message, Button} from 'semantic-ui-react'
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
    state = {
        value: ""
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const campaign = Campaign(this.props.address)

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            await Router.replaceRoute(`/campaigns/${this.props.address}`)
        }catch (err) {
            console.log(err.message)
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={(event) => this.setState({value: event.target.value})}
                    />
                    <Button primary>Contribute!</Button>

                </Form.Field>
            </Form>
        )
    }
}

export default ContributeForm;