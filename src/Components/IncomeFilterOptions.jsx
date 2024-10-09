import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import "../Styles/IncomeFilterOptions.css";


const IncomeFilter = ({ searchTerm, setSearchTerm, filterByCategory, startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <div className="incomeFilterOptionsMainContainer">


            <FormGroup className="IncomeFilterOptions">
                <Label for="searchByName"><b>Search By Transaction</b></Label>
                <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search By Transaction, Category, Amount, Date..."
                    value={searchTerm}
                    className="IncomeFilterOptions"
                    id="searchByName"
                    style={{ width: "100%" }}
                />
            </FormGroup>


            <FormGroup className="IncomeFilterOptions">
                <Label for="searchByCategory"><b>Search By Category</b></Label>
                <Input
                    name="select"
                    type="select"
                    onChange={(e) => filterByCategory(e.target.value)}
                    className="IncomeFilterOptions"
                    style={{ width: "100%" }}
                    id="searchByCategory"

                >
                    <option value="none">Select the Category</option>
                    <option value="Income From Salary">Income From Salary</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Income From Business or Profession">Income From Business or Profession</option>
                    <option value="Income from Property">Income from Property</option>
                    <option value="Income from Investments">Income from Investments</option>
                    <option value="Income From Other Sources">Income From Other Sources</option>
                </Input>
            </FormGroup>


            <FormGroup className="IncomeFilterOptions">
                <Label for="startDate"><b>Start Date</b></Label>
                <Input
                    id="startDate"
                    name="Start Date"
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                />
            </FormGroup>

            <FormGroup className="IncomeFilterOptions">
                <Label for="endDate"><b>End Date</b></Label>
                <Input
                    id="endDate"
                    name="End Date"
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                />
            </FormGroup>
        </div>
    );
};

export default IncomeFilter;
