import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { toast } from "sonner"; // or react-hot-toast (use what your app uses)
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../redux/expenseSlice";

const CreateExpense = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: ""
    });

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {expenses} = useSelector(store=>store.expense);


    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((previousData) => ({ ...previousData, [name]: value }));
    };
    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({ ...prevData, category: value }));
    };
    //   const [selectedCategory, setSelectedCategory] = useState("");
    //   const [customCategory, setCustomCategory] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            // Add API call here
            const res = await axios.post("https://expense-tracker-backend-m0fv.onrender.com/api/v1/expense/add", formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setExpenses([...expenses, res.data.expense]));
                toast.success(res.data.message);
                setIsOpen(false);
                setFormData({
                    description: "",
                    amount: "",
                    category: ""
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Button to trigger the dialog */}
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="outline">Add New Expense</Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle >Add New Expense</DialogTitle>
                    <DialogDescription>
                        Create an expense here. Click "Add" when you're done.
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form className="grid gap-4" onSubmit={submitHandler}>
                    {/* Description */}
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Enter description"
                            className="col-span-3"
                            name="description"
                            value={formData.description}
                            onChange={changeEventHandler}
                        />
                    </div>

                    {/* Amount */}
                    <div className="grid gap-3">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            placeholder="Enter amount"
                            className="col-span-3"
                            name="amount"
                            value={formData.amount}
                            onChange={changeEventHandler}
                        />
                    </div>

                    {/* Category Select */}
                    <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={changeCategoryHandler}>
                            <SelectTrigger id="category" className="w-[180px]">
                                <SelectValue placeholder="Select category" />
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
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>


                    </div>

                    {/* Footer Buttons */}
                    {/* <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            loading ? <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button> :
                                <Button type="submit">Add</Button>
                        }

                    </DialogFooter> */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                "Add"
                            )}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateExpense;
