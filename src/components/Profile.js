import React from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';

import ProfileSocial from "./ProfileSocial";
import ProfilePhotos from "./ProfilePhotos";
import ProfileInfo from "./ProfileInfo";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manager_first_name: "first name",
            manager_last_name: "last name",
            manager_email: "email@email.com",
            manager_phone: "+33 6 18 31 60 87",
            club_name: "club name",
            club_address: "club address",
            club_address2: "club address 2",
            club_zip_code: "13100",
            club_city: "Aix-en-Provence",
            club_phone: "+33 6 18 31 60 87",
            club_description: "club description ..."
        };
    }

    render() {

        return (
            <Tabs defaultActiveKey={1} id={"profileTabs"}>
                <Tab eventKey={1} title="Social">
                    <ProfileSocial/>
                </Tab>
                <Tab eventKey={2} title="Photos">
                    <ProfilePhotos/>
                </Tab>
                <Tab eventKey={3} title="Infos">
                    <ProfileInfo
                        manager_first_name={this.state.manager_first_name}
                        manager_last_name={this.state.manager_last_name}
                        manager_email={this.state.manager_email}
                        manager_phone={this.state.manager_phone}
                        club_name={this.state.club_name}
                        club_address={this.state.club_address}
                        club_address2={this.state.club_address2}
                        club_zip_code={this.state.club_zip_code}
                        club_city={this.state.club_name}
                        club_phone={this.state.club_photo}
                        club_description={this.state.club_description}
                    />
                </Tab>
            </Tabs>
        );
    }
}

export default Profile;