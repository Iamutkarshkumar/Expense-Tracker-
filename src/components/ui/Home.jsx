import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setCategory, setMarkAsDone } from "../../redux/expenseSlice";
import { useDispatch } from "react-redux";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "../../hooks/useGetExpenses";
import AnimatedBackground from "../shared/AnimatedBackground.jsx";

const Home = () => {
    useGetExpenses();
    const dispatch = useDispatch();

    const changeCategoryHandler = (value) => {
        dispatch(setCategory(value));
    };
    const changeDoneHandler = (value) => {
        dispatch(setMarkAsDone(value));
    };

    return (
        <div className="relative w-screen min-h-screen overflow-hidden">

            {/* Animated Background */}
            <AnimatedBackground />

            {/* Main Content */}
            <div className="absolute inset-0 z-10">
                <Navbar />
                <div className="max-w-6xl mx-auto mt-6 px-4">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent transition-transform duration-300 hover:scale-105">
                            Expense Tracker
                        </h1>

                        <CreateExpense />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 my-5">
                        <h1 className="font-medium text-lg text-black">Filter By:</h1>

                        <Select onValueChange={changeCategoryHandler}>
                            <SelectTrigger id="category" className="w-[180px]">
                                <SelectValue placeholder="Category"  />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="utilities">Utilities</SelectItem>
                                    <SelectItem value="transport">Transport</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="subscriptions">Subscriptions</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="gifts">Gifts</SelectItem>
                                    <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                    <SelectItem value="all">All</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={changeDoneHandler}>
                            <SelectTrigger id="markAs" className="w-[180px]">
                                <SelectValue placeholder="Mark As" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="done" >Done</SelectItem>
                                    <SelectItem value="undone">Undone</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <ExpenseTable />
                </div>
            </div>
        </div>
    );
};

export default Home;