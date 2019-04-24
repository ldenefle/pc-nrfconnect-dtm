/* Copyright (c) 2015 - 2018, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState } from 'react';
import { Panel, DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { logger } from 'nrfconnect/core';
import * as SettingsActions from '../actions/settingsActions';
import { fromPCA } from '../utils/boards';
import { DTM, DTM_PHY_STRING, DTM_MODULATION_STRING } from 'nrf-dtm-js';

const phyTypeView = (boardType, phy, onPhyUpdated) => {
    const compatibility = fromPCA(boardType);
    let items = Object.keys(compatibility.phy).map((keyname, idx) => (
            <MenuItem
            eventKey={keyname}
            onSelect={evt => onPhyUpdated(compatibility.phy[evt])}>
                {DTM_PHY_STRING[compatibility.phy[keyname]]}
            </MenuItem>
        )
    );
    return (
        <div>
            <label>PHY</label><br />
            <DropdownButton

                title={DTM_PHY_STRING[phy]}
                id={`dropdown-variants-phy-type`}
                >
                {items}
            </DropdownButton>
        </div>
    );
}

const modulationTypeView = (onModulationUpdated, modulation) => {
    let items = Object.keys(DTM_MODULATION_STRING).map((keyname, idx) => (
            <MenuItem
            eventKey={keyname}
            onSelect={evt => onModulationUpdated(evt)}>
                {DTM_MODULATION_STRING[keyname]}
            </MenuItem>
        )
    );
    return (
        <div>
            <label>Modulation Index</label><br />
            <DropdownButton

                title={DTM_MODULATION_STRING[modulation]}
                id={`dropdown-variants-phy-type`}
                >
                {items}
            </DropdownButton>
        </div>
    );
}


const OtherSettingsView = ({
    onModulationUpdated,
    modulation,
    boardType,
    phy,
    onPhyUpdated,
    }) => {
    const [open, setOpen] = useState(true);
    return (
        <div>
            <Panel collapsible
            expanded={open}
            header='Other settings'
            onSelect={() => setOpen(!open)}>
            {phyTypeView(boardType, phy, onPhyUpdated)}
            {modulationTypeView(onModulationUpdated, modulation)}
            </Panel>
        </div>
    );
}


OtherSettingsView.propTypes = {
    onModulationUpdated: PropTypes.func.isRequired,
    modulation: PropTypes.number.isRequired,
    boardType: PropTypes.number.isRequired,
    phy: PropTypes.number.isRequired,
    onPhyUpdated: PropTypes.func.isRequired,
};

export default OtherSettingsView;
