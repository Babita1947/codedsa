import { useEffect, useState } from "react";
import RightSide from "../components/problem-description/RightSide";
import { LeftSide } from "../components/problem-description/LeftSide";
import { Header } from "../components/problem-description/Header";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLocation } from "react-router";
import axios from "axios";
import TestCase from "@/components/problem-description/TestCase";
import { problemEndpoints } from "@/services/api";

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description");
    const [problem, setProblem] = useState({});
    const [size, setSize] = useState(50);
    const problemId = useLocation()?.state;

    const fetch_problem = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: problemEndpoints.GET_PROBLEM_BY_ID(problemId),
            });
            setProblem(response.data.data);
        } catch (error) {
            console.error("Error fetching problem by Id:", error);
        }
    };

    useEffect(() => {
        fetch_problem();
    }, [problemId]);

    return (
        <div className="w-full h-screen flex flex-col bg-[#f0f0f0] dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 transition-colors overflow-hidden font-sans">
            <Header />
            <div className="flex-1 p-2 overflow-hidden">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full h-full gap-1.5"
                >
                    <ResizablePanel defaultSize={50} minSize={25}>
                        <div className="h-full overflow-hidden">
                            <LeftSide
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                problem={problem}
                            />
                        </div>
                    </ResizablePanel>

                    <ResizableHandle className="w-1 rounded bg-transparent hover:bg-[#00b8a3]/60 transition-colors cursor-col-resize" />

                    <ResizablePanel key={size} defaultSize={size} minSize={25}>
                        <ResizablePanelGroup direction="vertical" className="gap-1.5">
                            <ResizablePanel defaultSize={70} minSize={25}>
                                <div className="h-full overflow-hidden">
                                    <RightSide
                                        setSize={setSize}
                                        initialCode={problem?.boiler_plate_code}
                                    />
                                </div>
                            </ResizablePanel>

                            <ResizableHandle className="h-1 rounded bg-transparent hover:bg-[#00b8a3]/60 transition-colors cursor-row-resize" />

                            <ResizablePanel defaultSize={30} minSize={15}>
                                <div className="w-full h-full overflow-hidden">
                                    <TestCase examples={problem.examples} />
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default QuestionDescription;
