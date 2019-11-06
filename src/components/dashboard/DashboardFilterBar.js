import React, { Component } from 'react';
import './DashboardFilterBar.scss';
import "@kenshooui/react-multi-select/dist/style.css"
import MultiSelect from "@kenshooui/react-multi-select";

class DashboardFilterBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            items: [
                { id: 0, label: "item 1" },
                { id: 2, label: "item 2", disabled: true },
                { id: 3, label: "item 3", disabled: false },
                { id: 4, label: "item 4" }
            ],
            selectedItems: []
        };
    }
    
 

    handleChange(selectedItems) {
        this.setState({ selectedItems });
    }
    render() {
        const { items, selectedItems } = this.state;
        return (
            <MultiSelect
                items={[
                    { id: 1, label: "France", group: "Pays" },
                    { id: 2, label: "Canada", group: "Pays" },
                    { id: 4, label: "Singapore", group: "Pays" },

                    { id: 5, label: "Paris", group: "Ville" },
                    { id: 6, label: "Brest", group: "Ville" },
                    { id: 7, label: "Grenoble", group: "Ville" },
                    { id: 8, label: "Bordeaux", group: "Ville" },
                    { id: 9, label: "Montréal", group: "Ville" },
                    { id: 10, label: "Singapore", group: "Ville" },
                    { id: 11, label: "Nantes", group: "Ville" },
                    { id: 12, label: "Lille", group: "Ville" },

                    { id: 13, label: "Développement JAVA/SPRING", group: "Programme" },
                    { id: 14, label: "Base de données", group: "Programme" },
                    { id: 15, label: "Architecture", group: "Programme" },
                    { id: 16, label: "Méthodologie de production", group: "Programme" },
                    { id: 17, label: "Culture Devops/Data", group: "Programme" }

                ]}
                withGrouping
                selectedItems={selectedItems}
                onChange={this.handleChange}
                showSearch={false}
                showSelectAll={false}
                noneSelectedMessage={false}
                showSelectedItems={true}
                messages={{
                    searchPlaceholder: "Search...",
                    noItemsMessage: "Aucun filtre sélectionné",
                    noneSelectedMessage: "None Selected",
                    selectedMessage: "delected",
                    selectAllMessage: "Select All",
                    clearAllMessage: "Clear All",
                    disabledItemsTooltip: "You can only select 1 file"
                }}
                itemHeight={25}
                // maxSelectedItems={}
            />
        );
    }
}

export default DashboardFilterBar;