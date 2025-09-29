import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {render, screen} from "@testing-library/react";
import UserGreeting from "./UserGreeting";
import { getUserGreeting } from "./utils/greetings";

vi.mock("./utils/greetings", () => ({
    getUserGreeting: vi.fn(),
}))

afterEach(() => vi.restoreAllMocks());

describe("User grerting", () => {
    it("success", async () => {
        //arrange
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            json: async () => ({name: "Jane"}),
        } as any);

        const handlers = { onGreet: () => {} };
        const spy = vi.spyOn(handlers, "onGreet");

        //act
        (getUserGreeting as any).mockReturnValue("Hello, Jane!");
        render(<UserGreeting userId="123" onGreet={handlers.onGreet}></UserGreeting>);
        
        //assert
        expect(await screen.findByRole("heading", {name: "Hello, Jane!"})).toBeInTheDocument();
        expect(spy).toHaveBeenCalled();
    });

    it("error",async () => {
        vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("boom"));
        const handlers = { onGreet: () => {} };
        const spy = vi.spyOn(handlers, "onGreet");

        render(<UserGreeting userId="123" onGreet={handlers.onGreet} />);
        expect(await screen.findByRole("alert")).toHaveTextContent("Failed to load greeting.");
        expect(spy).not.toHaveBeenCalled();
    })
})